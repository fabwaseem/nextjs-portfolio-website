import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/services/emailService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, projectType, budget, timeline, description } = body;

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Name, email, and description are required" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #667eea; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Project Inquiry</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              ${
                projectType
                  ? `
              <div class="field">
                <div class="label">Project Type:</div>
                <div class="value">${projectType}</div>
              </div>
              `
                  : ""
              }
              ${
                budget
                  ? `
              <div class="field">
                <div class="label">Budget:</div>
                <div class="value">${budget}</div>
              </div>
              `
                  : ""
              }
              ${
                timeline
                  ? `
              <div class="field">
                <div class="label">Timeline:</div>
                <div class="value">${timeline}</div>
              </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">Project Description:</div>
                <div class="value">${description.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: "hello@waseemanjum.com",
      subject: `New Project Inquiry from ${name}`,
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
