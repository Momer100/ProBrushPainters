import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/config/site";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = (formData.get("name") as string) || "Not provided";
    const phone = (formData.get("phone") as string) || "Not provided";
    const email = (formData.get("email") as string) || "Not provided";
    const service = (formData.get("service") as string) || "Not specified";
    const scope = (formData.get("scope") as string) || "Not specified";
    const estimatedPrice = (formData.get("estimatedPrice") as string) || "N/A";
    const location = (formData.get("location") as string) || "Not specified";
    const details = (formData.get("details") as string) || "None";

    // Extract photo files from form data
    const files = formData.getAll("photos") as File[];
    const attachments: Array<{ filename: string; content: Buffer }> = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        attachments.push({
          filename: file.name || `photo_${Date.now()}.jpg`,
          content: buffer,
        });
      }
    }

    const recipientEmail = site.quoteEmail || site.email;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; rounded-lg; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center; color: white;">
          <h2 style="margin: 0; font-size: 24px; color: #f59e0b;">🎨 ${site.name} — New Quote Request</h2>
          <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 14px;">Estimate Request & Photo Upload</p>
        </div>

        <div style="padding: 24px;">
          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 8px 0; color: #0f172a; font-size: 18px;">Job Scope & Starting Estimate</h3>
            <p style="margin: 4px 0; font-size: 15px;"><strong>Service:</strong> ${service}</p>
            <p style="margin: 4px 0; font-size: 15px;"><strong>Job Size / Scope:</strong> ${scope}</p>
            <p style="margin: 4px 0; font-size: 16px; color: #d97706;"><strong>Estimated Starting Price:</strong> ${estimatedPrice}</p>
          </div>

          <h3 style="margin: 20px 0 10px 0; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">Customer Contact Information</h3>
          <p style="margin: 6px 0; font-size: 15px;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 6px 0; font-size: 15px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #2563eb; font-weight: bold;">${phone}</a></p>
          <p style="margin: 6px 0; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
          <p style="margin: 6px 0; font-size: 15px;"><strong>Location / Area:</strong> ${location}</p>

          <h3 style="margin: 20px 0 10px 0; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">Additional Details</h3>
          <p style="margin: 6px 0; font-size: 14px; line-height: 1.5; color: #475569;">${details}</p>

          <h3 style="margin: 20px 0 10px 0; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">Job Photos Attached</h3>
          <p style="margin: 6px 0; font-size: 14px; color: #475569;">
            ${
              attachments.length > 0
                ? `Attached ${attachments.length} image file(s) to this email.`
                : "No photos uploaded."
            }
          </p>
        </div>

        <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
          Sent automatically from ${site.name} quote system (${site.domain})
        </div>
      </div>
    `;

    // Configure Nodemailer SMTP transporter
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${site.name} Quote Form" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: email !== "Not provided" ? email : undefined,
        subject: `New Quote Request (${service} - ${name})`,
        html: htmlBody,
        attachments: attachments,
      });

      console.log(`[Quote Form] Email successfully sent to ${recipientEmail}`);
    } else {
      // Fallback log if SMTP credentials aren't set in ENV yet
      console.log(`[Quote Form] Received submission for ${recipientEmail}:`, {
        name,
        phone,
        email,
        service,
        scope,
        estimatedPrice,
        location,
        details,
        attachmentsCount: attachments.length,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Quote request received successfully!",
    });
  } catch (err: any) {
    console.error("[Quote API Error]:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to process quote" },
      { status: 500 }
    );
  }
}
