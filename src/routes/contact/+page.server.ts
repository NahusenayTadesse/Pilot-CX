import { db } from '$lib/server/db';
import { quotes } from '$lib/server/db/schema';
import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { HOST, USER, PASSWORD } from '$env/static/private';
import path from 'path';

async function sendEmails(data: {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	numberOfTeams: number | null;
	ticketsPerWeek: number | null;
	existingTeam: string | null;
	startDate: Date | null;
	details: string;
}) {
	const transporter = nodemailer.createTransport({
		host: HOST,
		port: 587,
		secure: false,
		auth: {
			user: USER,
			pass: PASSWORD
		}
	});

	const {
		firstName,
		lastName,
		email,
		phone,
		numberOfTeams,
		ticketsPerWeek,
		existingTeam,
		startDate,
		details
	} = data;

    const currentYear = new Date().getFullYear();


	const htmlContent = `
	<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
		<div style="background-color: #2F86C7; height: 100px; text-align: center; margin-bottom: 20px; padding-top: 50px">
			<img src="cid:logo" alt="Pilot CX Logo" style="width: 150px; height: auto;" />
		</div>
		<h2 style="color: #27b4f2;">Thank You for Your Submission!</h2>
		<p>Hi ${firstName},</p>
		<p>We appreciate you reaching out to <a href="https://pilotcx.com" style="color: #27b4f2; text-decoration: none">Pilot CX</a>. Your request has been received and our team will review your submission shortly.</p>
		<p>If you have any additional questions, feel free to reply to this email.</p>
		<br>
		<p>Best regards,<br><strong style="color: #27b4f2;">Pilot CX Team</strong></p>
		<p style="text-align: center;"> &copy; ${currentYear} <a href="https://pilotcx.com"style="color: #27b4f2; text-decoration: none;">
Pilot CX </a> All Rights Reserved </p>
	</div>
	`;

	const startedDate = startDate ? startDate.toLocaleDateString() : '';

	const adminhtml = `
	<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
	<div style="background-color: #2F86C7; height: 100px; text-align: center; margin-bottom: 20px; padding-top: 50px">
			<img src="cid:logo" alt="Pilot CX Logo" style="width: 150px; height: auto;" />
		</div>
		<h2 style="color: #27b4f2;">New Quote Submission Received</h2>

		<p><strong style="color: #27b4f2;">Name:</strong> ${firstName} ${lastName}</p>
		<p><strong style="color: #27b4f2;">Email:</strong> ${email}</p>
		${phone ? `<p><strong style="color: #27b4f2;">Phone:</strong> ${phone}</p>` : ''}
		${existingTeam ? `<p><strong style="color: #27b4f2;">Existing Team:</strong> ${existingTeam}</p>` : ''}
		${numberOfTeams ? `<p><strong style="color: #27b4f2;">Number of Teams:</strong> ${numberOfTeams}</p>` : ''}
		${ticketsPerWeek ? `<p><strong style="color: #27b4f2;">Tickets per Week:</strong> ${ticketsPerWeek}</p>` : ''}
		${startDate ? `<p><strong style="color: #27b4f2;">Start Date:</strong> ${startedDate}</p>` : ''}

		<p><strong style="color: #27b4f2;">Details:</strong></p>
		<p>${details}</p>

		<br>
	<p style="text-align: center;"> &copy; ${currentYear} <a href="https://pilotcx.com"style="color: #27b4f2; text-decoration: none;">
Pilot CX </a> All Rights Reserved </p>
	</div>
	`;

	const logoPath = path.join(process.cwd(), 'static', 'Logo.svg');

	// Send to user
	await transporter.sendMail({
		from: `"Pilot CX" <${USER}>`,
		to: email,
		subject: 'Thank you for contacting Pilot CX!',
		html: htmlContent,
		attachments: [
			{
				filename: 'Logo.svg',
				path: logoPath,
				cid: 'logo'
			}
		]
	});

	// Send to admin
	await transporter.sendMail({
		from: `"Quote Request Form" <${USER}>`,
		to: 'hello@pilotcx.com',
		subject: '📩 New Quote Form Submission',
		html: adminhtml,
		attachments: [
			{
				filename: 'Logo.svg',
				path: logoPath,
				cid: 'logo'
			}
		]
	});
}

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const firstName = formData.get('firstName') as string;
			const lastName = formData.get('lastName') as string;
			const email = formData.get('email') as string;
			const phone = formData.get('phone') as string;
			const numberOfTeams = formData.get('numberOfTeams') as string;
			const ticketsPerWeek = formData.get('ticketsPerWeek') as string;
			const existingTeam = formData.get('existingTeam') as string;
			const startDate = formData.get('startDate') as string;
			const details = formData.get('details') as string;

			// Insert into DB first
			await db.insert(quotes).values({
				firstName,
				lastName,
				email,
				phone,
				numberOfTeams: numberOfTeams ? parseInt(numberOfTeams, 10) : null,
				ticketsPerWeek: ticketsPerWeek ? parseInt(ticketsPerWeek, 10) : null,
				existingTeam,
				startDate: startDate ? new Date(startDate) : null,
				details
			});

			// Fire & forget email sending — don't await!
			sendEmails({
				firstName,
				lastName,
				email,
				phone,
				numberOfTeams: numberOfTeams ? parseInt(numberOfTeams, 10) : null,
				ticketsPerWeek: ticketsPerWeek ? parseInt(ticketsPerWeek, 10) : null,
				existingTeam,
				startDate: startDate ? new Date(startDate) : null,
				details
			}).catch((err) => {
				console.error('Error sending emails:', err);
			});

			// Immediately respond success to user
			return { success: true };
		} catch (error) {
			console.error('Error inserting quote:', error);
			return { success: false, error: 'Failed to submit quote.' };
		}
	}
};
