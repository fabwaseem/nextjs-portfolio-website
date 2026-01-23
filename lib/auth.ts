import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "@/services/emailService";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, ctx) => {
        const magicLinkHtml = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Admin Login - Magic Link</title>
                        <style>
                            body {
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #f8f9fa;
                            }
                            .email-container {
                                background: white;
                                border-radius: 12px;
                                padding: 40px;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 30px;
                            }
                            .logo {
                                font-size: 28px;
                                font-weight: bold;
                                color: #0f172a;
                                margin-bottom: 10px;
                            }
                            .button {
                                display: inline-block;
                                padding: 14px 28px;
                                background: #0f172a;
                                color: white;
                                text-decoration: none;
                                border-radius: 8px;
                                font-weight: 600;
                                margin: 20px 0;
                            }
                            .button:hover {
                                background: #1e293b;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 30px;
                                padding-top: 20px;
                                border-top: 1px solid #e5e7eb;
                                color: #6b7280;
                                font-size: 14px;
                            }
                            .link-text {
                                word-break: break-all;
                                color: #64748b;
                                font-size: 12px;
                                margin-top: 20px;
                                padding: 10px;
                                background: #f3f4f6;
                                border-radius: 6px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="header">
                                <div class="logo">Admin Portal</div>
                            </div>
                            <p>Click the button below to sign in to your admin account:</p>
                            <div style="text-align: center;">
                                <a href="${url}" class="button">Sign In to Admin Portal</a>
                            </div>
                            <p style="font-size: 14px; color: #64748b;">This link will expire in 5 minutes.</p>
                            <p style="font-size: 14px; color: #64748b;">If the button doesn't work, copy and paste this link into your browser:</p>
                            <div class="link-text">${url}</div>
                            <div class="footer">
                                <p>If you didn't request this link, please ignore this email.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;

        await sendEmail({
          subject: "Admin Login - Magic Link",
          to: email,
          html: magicLinkHtml,
        });
      },
      disableSignUp: true,
      expiresIn: 300,
    }),
  ],
});