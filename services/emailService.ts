import nodemailer from "nodemailer";

export interface MailOptions {
  from?: string;
  subject: string;
  to: string;
  html: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export const sendEmail = async ({
  subject,
  to,
  html,
  attachments,
}: MailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const options: MailOptions = {
    from: process.env.SMTP_USER,
    to,
    // cc: email,
    subject,
    html,
  };

  if (attachments) {
    options.attachments = attachments;
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transporter.sendMail(options, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  return await sendMailPromise();
};
