import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, city, role } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const payload = {
      email,
      city: city || "Not Specified",
      role: role || "Not Specified",
      created_at: new Date().toISOString(),
    };

    console.log("[Invite Request Received]:", payload);

    let dbSaved = false;
    let adminEmailSent = false;
    let userEmailSent = false;
    let adminMessageId = null;
    let userMessageId = null;
    let dbError = null;
    let emailError = null;

    // 1. Save to Supabase Database
    if (supabase) {
      const { error } = await supabase
        .from("invitation_requests")
        .insert([payload]);

      if (error) {
        console.error("[Supabase Error]:", error);
        dbError = error.message;
      } else {
        dbSaved = true;
      }
    } else {
      console.warn("[Supabase Warning]: Supabase credentials not set in environment variables.");
    }

    // 2. Send Emails via Brevo API
    const brevoApiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || "hello@iqcommune.com";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "hello@iqcommune.com";
    const senderName = process.env.BREVO_SENDER_NAME || "InvestQ Commune";
    const sendCustomerEmail = process.env.ENABLE_CUSTOMER_THANK_YOU_EMAIL !== "false";

    if (brevoApiKey) {
      try {
        // A) Send Admin Notification Email (To Team)
        const adminRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            sender: { name: `${senderName} Platform`, email: senderEmail },
            to: [{ email: adminEmail, name: "iqcommune Admin Team" }],
            subject: `[New Request] ${city} - ${role} (${email})`,
            htmlContent: `
              <div style="font-family: Arial, sans-serif; background-color: #0f1117; color: #f8f7f4; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto;">
                <h2 style="color: #c9982a; margin-top: 0;">New Private Invitation Request</h2>
                <p style="color: #9496a1;">A new practitioner has requested an invitation on <strong>iqcommune</strong>:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px; background: rgba(255,255,255,0.03); border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #222; color: #9496a1; width: 120px;">Email:</td>
                    <td style="padding: 12px; border-bottom: 1px solid #222; font-weight: bold; color: #f8f7f4;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #222; color: #9496a1;">City:</td>
                    <td style="padding: 12px; border-bottom: 1px solid #222; color: #e0c870; font-weight: bold;">${city}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #222; color: #9496a1;">Role:</td>
                    <td style="padding: 12px; border-bottom: 1px solid #222; color: #f8f7f4;">${role}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; color: #9496a1;">Submitted At:</td>
                    <td style="padding: 12px; color: #9496a1;">${new Date().toLocaleString("en-IN")}</td>
                  </tr>
                </table>
              </div>
            `,
          }),
        });

        const adminData = await adminRes.json();
        if (adminRes.ok) {
          adminEmailSent = true;
          adminMessageId = adminData.messageId;
          console.log("[Brevo Admin Email Sent]:", adminData.messageId);
        } else {
          console.error("[Brevo Admin Email Error]:", adminData);
        }

        // B) Send Automated Thank You / Confirmation Email to User / Customer
        if (sendCustomerEmail) {
          const userRes = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": brevoApiKey,
            },
            body: JSON.stringify({
              sender: { name: senderName, email: senderEmail },
              to: [{ email: email }],
              subject: "Your Invitation Request — iqcommune",
              htmlContent: `
                <div style="font-family: 'DM Sans', Helvetica, Arial, sans-serif; background-color: #0f1117; color: #f8f7f4; padding: 40px 24px; max-width: 580px; margin: auto; border-radius: 16px; border: 1px solid rgba(201, 152, 42, 0.3);">
                  
                  <!-- Logo -->
                  <div style="margin-bottom: 28px;">
                    <span style="font-size: 32px; font-weight: 700; color: #c9982a; letter-spacing: -1px;">iq</span><span style="font-size: 32px; font-weight: 300; color: #f8f7f4; letter-spacing: -1px;">commune</span><span style="display: inline-block; width: 6px; height: 6px; background-color: #3a8a3a; border-radius: 50%; margin-left: 4px;"></span>
                  </div>

                  <!-- Main Content -->
                  <h1 style="font-size: 20px; font-weight: 600; color: #f8f7f4; margin-bottom: 16px;">
                    Your Invitation Request is Confirmed
                  </h1>

                  <p style="font-size: 14px; line-height: 1.7; color: #9496a1; margin-bottom: 24px;">
                    Thank you for your interest in joining <strong>iqcommune</strong>. A room is taking shape — real professionals, real sessions, no pitch, no product.
                  </p>

                  <!-- Profile Summary Card -->
                  <div style="background-color: rgba(201, 152, 42, 0.08); border: 1px solid rgba(201, 152, 42, 0.25); padding: 18px 20px; border-radius: 12px; margin-bottom: 24px;">
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #e0c870; font-weight: 700; margin-bottom: 8px;">
                      Request Details
                    </div>
                    <div style="font-size: 13px; color: #f8f7f4; margin-bottom: 4px;">
                      <strong>City:</strong> <span style="color: #e0c870;">${city}</span>
                    </div>
                    <div style="font-size: 13px; color: #f8f7f4;">
                      <strong>Profile:</strong> ${role}
                    </div>
                  </div>

                  <p style="font-size: 14px; line-height: 1.7; color: #9496a1; margin-bottom: 32px;">
                    We curate sessions city by city across India to ensure high-density peer conversations. As soon as the upcoming room in <strong>${city}</strong> opens for your cohort, we will reach out directly with your private access pass.
                  </p>

                  <!-- Signature -->
                  <div style="border-top: 1px solid rgba(148, 150, 161, 0.2); padding-top: 20px; text-align: left;">
                    <div style="font-size: 13px; font-weight: 600; color: #f8f7f4;">${senderName} Team</div>
                    <div style="font-size: 12px; color: #9496a1; margin-top: 2px;">Insight Quotient — Unleashed</div>
                    
                    <div style="margin-top: 16px;">
                      <a href="https://linkedin.com/company/iqcommune" style="font-size: 12px; color: #c9982a; text-decoration: none; margin-right: 16px;">LinkedIn @iqcommune</a>
                      <a href="https://instagram.com/iqcommune" style="font-size: 12px; color: #c9982a; text-decoration: none;">Instagram @iqcommune</a>
                    </div>
                  </div>

                </div>
              `,
            }),
          });

          const userData = await userRes.json();
          if (userRes.ok) {
            userEmailSent = true;
            userMessageId = userData.messageId;
            console.log("[Brevo Customer Email Sent]:", userData.messageId);
          } else {
            console.error("[Brevo Customer Email Error]:", userData);
            emailError = JSON.stringify(userData);
          }
        }
      } catch (err) {
        console.error("[Brevo Exception]:", err);
        emailError = String(err);
      }
    } else {
      console.warn("[Brevo Warning]: BREVO_API_KEY not set in environment variables.");
    }

    return NextResponse.json({
      success: true,
      data: payload,
      status: {
        dbSaved,
        adminEmailSent,
        userEmailSent,
        adminMessageId,
        userMessageId,
        dbError,
        emailError,
      },
    });
  } catch (error) {
    console.error("[API Error]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
