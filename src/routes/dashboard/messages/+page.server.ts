import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { HOST, USER, PASSWORD } from '$env/static/private';



export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();

      const email = formData.get('email') as string;
      const name = formData.get('name') as string;
      const subject = formData.get('subject') as string;
      const replyMessage = formData.get('message') as string;

      // Basic validation
      if ( !subject || !email || !name || !replyMessage) {
        return {
          success: false,
          error: 'Missing required fields.'
        };
      }
      const transporter = nodemailer.createTransport({
        host: HOST,
        port: 587,
        secure: false,
        auth: {
          user: USER,
          pass: PASSWORD
        }
      });

      const currentYear = new Date().getFullYear();


      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2F86C7; height: 100px; text-align: center; margin-bottom: 20px; padding-top: 50px">
            <img src="https://pilotcx.com/Logo.svg" alt="Pilot CX Logo" style="width: 150px; height: auto;" />
          </div>
          
          
          <p>Hi ${name},</p>
          
          <div style="background-color: #f4f8fb; padding: 15px; margin: 20px 0;">
            ${replyMessage}
          </div>
          

          <br>
          <p>Best regards,<br><strong style="color: #27b4f2;">Pilot CX Team</strong></p>
            <p style="text-align: center;"> &copy; ${currentYear} <a href="https://pilotcx.com"style="color: #27b4f2; text-decoration: none;">
Pilot CX </a> All Rights Reserved </p>
        </div>
      `;


      await transporter.sendMail({
        from: `"Pilot CX" <${USER}>`,
        to: email,
        subject: subject,
        html: htmlContent,
      });

      return {
        success: true
      };

    } catch (error) {
      console.error('Error processing message:', error);

      return {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
};

