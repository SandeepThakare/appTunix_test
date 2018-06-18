/**
 * This service module deals with the sending of template emails
 * @author sandeep thakare
 * @since Monday, June 18, 2018 11:59 AM
 */
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { ResponseUtility } from '../utility';

const user = process.env.BUSINESS_EMAIL;
const password = process.env.BUSINESS_EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user,
		pass: password,
	},
});

/**
 * function to send mail
 * @param {String} to		-> send email to
 * @param {String} text		-> email content
 * @param {String} subject	-> subject of email
 */
const sendMail = ({ to, subject = 'Mail from tutable app', html }) => new Promise((resolve, reject) => {

	// read html file here

	transporter.sendMail({
		from: user,
		to,
		html,
		subject,
	}, (err) => {
		if (err) {
			return reject(ResponseUtility.ERROR({ message: 'Error sending email.', error: err }));
		}
		return resolve(ResponseUtility.SUCCESS);
	});
});

/**
 * send this email template for now account registering
 * @param {String} to, email of the user to send email
 * @param {String} name of the recipient (for salutation)
 * @param {Number} verificationCode to send the generated verification token
 */
const NewAccountMail = ({ to, name, verificationCode }) => new Promise((resolve, reject) => {
	const html = fs.readFileSync(path.resolve(__dirname, 'template', 'new_account_template.html'), { encoding: 'utf-8' });
	const template = handlebars.compile(html);
	const props = { user_name: name, verification_code: verificationCode };
	const compiled = template(props);

	sendMail({ to, subject: 'New account created', html: compiled })
		.then(success => resolve(success))
		.catch(err => reject(err));
});

/**
 * the send the hange password email.
 * @param {String} to, email of the user to send email
 * @param {String} name of the recipient (for salutation)
 * @param {Number} code to send for verification
 */
const ChangePasswordToken = ({ to, name, code }) => new Promise((resolve, reject) => {
	if (to && name && code) {
		const html = fs.readFileSync(path.resolve(__dirname, 'template', 'pass_change_template.html'), { encoding: 'utf-8' });
		const template = handlebars.compile(html);
		const props = { user_name: name, verification_code: code };
		const compiled = template(props);

		sendMail({ to, subject: 'twitter_handler Password Reset Request', html: compiled })
			.then(success => resolve(success))
			.catch(err => reject(err));
	} else {
		reject(ResponseUtility.MISSING_REQUIRED_PROPS);
	}
});

/**
 * @param {String} to, email of the user to send email
 * @param {String} name of the recipient (for salutation)
 * @param {Number} code the new generated code
*/
const VerificationToken = ({ to, name, code }) => new Promise((resolve, reject) => {
	if (to && name && code) {
		const html = fs.readFileSync(path.resolve(__dirname, 'template', 'verification_code_template.html'), { encoding: 'utf-8' });
		const template = handlebars.compile(html);
		const props = { user_name: name, verification_code: code };
		const compiled = template(props);

		sendMail({ to, subject: 'Verify your Email for twitter_handler Account', html: compiled })
			.then(success => resolve(success))
			.catch(err => reject(err));
	} else {
		reject(ResponseUtility.MISSING_REQUIRED_PROPS);
	}
});

export default {
	NewAccountMail,
	ChangePasswordToken,
	VerificationToken,
};
