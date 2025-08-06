import type { PageServerLoad } from "./$types";
import {db} from '$lib/server/db';

import {quotes, replies} from '$lib/server/db/schema';

import { eq } from "drizzle-orm";

import { error } from '@sveltejs/kit';

import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { HOST, USER, PASSWORD } from '$env/static/private';
import path from 'path';



export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    try {
           const [singlequote] = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);        
           
           if (!singlequote) {
            throw error(404, 'Quote not found');
        }

        return { singlequote };
    } catch (err) {
        console.error('Error loading quote:', err);
        throw error(500, 'Failed to load quote');
    }
};


export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();

      const quoteId = formData.get('quoteId') as string;
      const email = formData.get('email') as string;
      const name = formData.get('name') as string;
      const replyMessage = formData.get('reply') as string;

      // Basic validation
      if (!quoteId || !email || !name || !replyMessage) {
        return {
          success: false,
          error: 'Missing required fields.'
        };
      }

      // Save reply to the database
      await db.insert(replies).values({
        quoteId,
        replyMessage
      });

      const transporter = nodemailer.createTransport({
        host: HOST,
        port: 587,
        secure: false,
        auth: {
          user: USER,
          pass: PASSWORD
        }
      });

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:logo" alt="Pilot CX Logo" style="width: 150px; height: auto;" />
          </div>
          
          <h2 style="color: #27b4f2;">Your Quote Request Response</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for your interest in <strong style="color: #27b4f2;">Pilot CX</strong>. Below is our response to your quote request:</p>
          
          <div style="background-color: #f4f8fb; border-left: 4px solid #27b4f2; padding: 15px; margin: 20px 0;">
            ${replyMessage}
          </div>
          
          <p>If you have any questions or would like to discuss this quote further, please don’t hesitate to reach out by replying to this email.</p>
          
          <p>We appreciate your consideration and look forward to the opportunity to work with you.</p>
          
          <br>
          <p>Best regards,<br><strong style="color: #27b4f2;">Pilot CX Team</strong></p>
        </div>
      `;

      const logoPath = path.join(process.cwd(), 'static', 'Logo.svg');

      await transporter.sendMail({
        from: `"Pilot CX" <${USER}>`,
        to: email,
        subject: "Pilot CX: Response to Your Quote Request!",
        html: htmlContent,
        attachments: [
          {
            filename: 'Logo.svg',
            path: logoPath,
            cid: 'logo'
          }
        ]
      });

      return {
        success: true
      };

    } catch (error) {
      console.error('Error processing form submission:', error);

      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
};



