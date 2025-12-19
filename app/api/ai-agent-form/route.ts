import { NextRequest, NextResponse } from "next/server";

interface FormData {
  email: string;
  answers: { question: string; answer: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Validate email
    if (!data.email || !data.email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Format the answers for email
    const answersText = data.answers
      .map((a, i) => `${i + 1}. ${a.question}\n   Answer: ${a.answer || "Not answered"}`)
      .join("\n\n");

    const emailContent = `
New AI Agent Form Submission
============================

Email: ${data.email}

Responses:
${answersText}

---
Submitted at: ${new Date().toISOString()}
    `.trim();

    // Log for now (in production, integrate with email service)
    console.log("AI Agent Form Submission:", emailContent);

    // Here you would integrate with your email service
    // Example with Resend, SendGrid, or Nodemailer:
    // await sendEmail({
    //   to: "info@edgeforgarments.com",
    //   subject: `New AI Agent Form: ${data.email}`,
    //   text: emailContent,
    // });

    return NextResponse.json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("AI Agent Form Error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
