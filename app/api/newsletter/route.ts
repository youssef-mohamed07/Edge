import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const contactEmail = process.env.CONTACT_EMAIL || "info@edgeforgarments.com";

    // Send notification to admin
    await transporter.sendMail({
      from: `"EDGE for Garments" <${process.env.GMAIL_USER}>`,
      to: contactEmail,
      subject: `New Newsletter Subscription: ${email}`,
      text: `New newsletter subscription from: ${email}\n\nSubscribed at: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
          <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #122D8B; margin-bottom: 20px;">New Newsletter Subscription</h2>
            <p style="color: #333; font-size: 16px;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Subscribed at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation to subscriber
    await transporter.sendMail({
      from: `"EDGE for Garments" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to EDGE Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
          <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #122D8B; margin-bottom: 20px;">Thank You for Subscribing!</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              You've successfully subscribed to the EDGE for Garments newsletter.
            </p>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Stay tuned for updates on our latest products, industry news, and exclusive offers.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              EDGE for Garments | Port Said Free Zone, Egypt
            </p>
          </div>
        </div>
      `,
    });

    console.log("Newsletter subscription:", email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
