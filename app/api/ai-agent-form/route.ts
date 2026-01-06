import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

interface FormData {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  contactMethod: string;
  answers: { question: string; answer: string }[];
  source?: string;
}

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Extract answers by question ID
    const getAnswer = (questionText: string) => {
      const answer = data.answers.find(a => a.question.toLowerCase().includes(questionText.toLowerCase()));
      return answer?.answer || "";
    };

    // Save to Supabase
    const { error: dbError } = await supabase.from("form_submissions").insert({
      name: data.name || null,
      email: data.email || null,
      phone: data.phone || null,
      whatsapp: data.whatsapp || null,
      contact_method: data.contactMethod || null,
      garment_type: getAnswer("garment"),
      quantity: getAnswer("quantity"),
      services: getAnswer("services"),
      timeline: getAnswer("timeline"),
      location: getAnswer("based") || getAnswer("location"),
      consultation: getAnswer("consultation"),
      answers: data.answers,
      status: "new",
    });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    // Get contact info for email
    const contactInfo = data.email || data.phone || data.whatsapp || "Not provided";

    // Format the answers for email
    const answersHTML = data.answers
      .map(
        (a, i) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: 500;">${i + 1}. ${a.question}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${a.answer || "Not answered"}</td>
        </tr>
      `
      )
      .join("");

    const answersText = data.answers
      .map((a, i) => `${i + 1}. ${a.question}\n   Answer: ${a.answer || "Not answered"}`)
      .join("\n\n");

    // HTML Email Template for Admin
    const adminHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #122D8B 0%, #1A4AFF 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New AI Agent Form Submission</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">EDGE for Garments</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #1A4AFF;">
            <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Contact Method: ${data.contactMethod || "Email"}</p>
            <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${contactInfo}</p>
          </div>
          
          <h2 style="color: #122D8B; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">Customer Responses</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${answersHTML}
          </table>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Submitted on ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    // Plain text version for admin
    const adminTextContent = `
New AI Agent Form Submission - EDGE for Garments
================================================

Contact Method: ${data.contactMethod || "Email"}
Contact: ${contactInfo}

Responses:
${answersText}

---
Submitted at: ${new Date().toISOString()}
    `.trim();

    const contactEmail = process.env.CONTACT_EMAIL || "info@edgeforgarments.com";
    
    // Send email to admin
    await transporter.sendMail({
      from: `"EDGE for Garments" <${process.env.GMAIL_USER}>`,
      to: contactEmail,
      subject: `New AI Agent Form Submission: ${contactInfo}`,
      text: adminTextContent,
      html: adminHtmlContent,
      replyTo: data.email || undefined,
    });

    // Send confirmation email to customer if email provided
    if (data.email && data.email.includes("@")) {
      const customerHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #122D8B 0%, #1A4AFF 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Your Inquiry</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">EDGE for Garments</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Dear Valued Customer,
            </p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for reaching out to EDGE for Garments. We have received your inquiry and our team will review your requirements shortly.
            </p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
              One of our representatives will contact you within 24-48 business hours.
            </p>
            
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 13px;">
                <strong>WhatsApp:</strong> <a href="https://wa.me/201222493500" style="color: #1A4AFF; text-decoration: none;">+20 122 249 3500</a>
              </p>
              <p style="margin: 0; color: #4b5563; font-size: 13px;">
                <strong>Email:</strong> <a href="mailto:info@edgeforgarments.com" style="color: #1A4AFF; text-decoration: none;">info@edgeforgarments.com</a>
              </p>
            </div>
            
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">
              Best regards,<br>
              <strong style="color: #122D8B;">EDGE for Garments Team</strong>
            </p>
          </div>
        </div>
      </body>
      </html>
      `;

      await transporter.sendMail({
        from: `"EDGE for Garments" <${process.env.GMAIL_USER}>`,
        to: data.email,
        subject: `Thank You for Your Inquiry - EDGE for Garments`,
        html: customerHtmlContent,
      });
    }

    console.log("AI Agent Form submitted successfully");

    return NextResponse.json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("AI Agent Form Error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}

// GET - Fetch all submissions for dashboard
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
