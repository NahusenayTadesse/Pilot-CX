import { db } from '$lib/server/db'; // adjust path to your drizzle db instance
import { quotes } from '$lib/server/db/schema'; // adjust path to your drizzle schema
import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { HOST, USER, PASSWORD } from '$env/static/private';
import path from 'path';


export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            const company = formData.get('company') as string | null;
            const phone = formData.get('phone') as string | null;
            const service = formData.get('service') as string;
            const budget = formData.get('budget') ? Number(formData.get('budget')) : null;
            const timeline = formData.get('timeline') as string | null;
            const details = formData.get('details') as string;

            await db.insert(quotes).values({
                name,
                email,
                company,
                phone,
                service,
                budget,
                timeline,
                details
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
        <h2 style="color: #27b4f2;">Thank You for Your Submission!</h2>
        <p>Hi ${name},</p>
        <p>We appreciate you reaching out to <strong style="color: #27b4f2;">Pilot CX</strong>. Your request has been received and our team will review your submission shortly.</p>
        <p>If you have any additional questions, feel free to reply to this email.</p>
        <br>
        <p>Best regards,<br><strong style="color: #27b4f2;">Pilot CX Team</strong></p>
    </div>
`;



            const adminhtml = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:logo" alt="Pilot CX Logo" style="width: 150px; height: auto;" />
        </div>
        <h2 style="color: #27b4f2;">New Quote Submission Received</h2>
        <p><strong style="color: #27b4f2;">Name:</strong> ${name}</p>
        <p><strong style="color: #27b4f2;">Email:</strong> ${email}</p>
        ${company ? `<p><strong style="color: #27b4f2;">Company:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong style="color: #27b4f2;">Phone:</strong> ${phone}</p>` : ''}
        <p><strong style="color: #27b4f2;">Service:</strong> ${service}</p>
        ${budget !== null ? `<p><strong style="color: #27b4f2;">Budget:</strong> $${budget}</p>` : ''}
        ${timeline ? `<p><strong style="color: #27b4f2;">Timeline:</strong> ${timeline}</p>` : ''}
        <p><strong style="color: #27b4f2;">Details:</strong></p>
        <p>${details}</p>
        <br>
        <p style="font-size: 12px; color: #777;">This is an automated notification for the <strong style="color: #27b4f2;">Pilot CX</strong> website.</p>
    </div>
`;


const logoPath = path.join(process.cwd(), 'static', 'Logo.svg');

            // #Notification for User
            await transporter.sendMail({
                from: `"Pilot CX" <${USER}>`,
                to: email,
                subject: "Thank you for contacting Pilot CX!",
                html: htmlContent,
                attachments: [
    {
      filename: 'Logo.svg',
      path: logoPath, // path to your local file
      cid: 'logo' // same as the cid in the <img src="">
    }
  ]
            });

            // #Notification for Admin

            await transporter.sendMail({
        from: `"Quote Request Form" <${USER}>`,
        to: 'hello@pilotcx.com', 
        subject: '📩 New  Form Submission',
        html: adminhtml,
        attachments: [
    {
      filename: 'Logo.svg',
      path: logoPath, // path to your local file
      cid: 'logo' // same as the cid in the <img src="">
    }
  ]
      });




            return { success: true };
        } catch (error) {
            console.error('Error inserting quote:', error);
            return { success: false, error: 'Failed to submit quote.' };
        }
    }
};