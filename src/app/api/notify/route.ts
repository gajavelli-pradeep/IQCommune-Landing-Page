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

        // B) Send Automated Personal Transactional Confirmation Email to User / Customer
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
              subject: "Invitation Request Confirmed — iqcommune",
              tags: ["transactional-confirmation"],
              headers: {
                "X-Mailin-Tag": "transactional-confirmation",
                "X-Auto-Response-Suppress": "OOF, AutoReply",
              },
              htmlContent: `
                <div style="font-family: Arial, Helvetica, sans-serif; background-color: #0f1117; color: #f8f7f4; padding: 36px 20px; max-width: 560px; margin: auto; border-radius: 12px; border: 1px solid #c9982a;">
                  
                  <div style="font-size: 24px; font-weight: bold; color: #c9982a; margin-bottom: 20px;">
                    iqcommune<span style="color:#3a8a3a;">.</span>
                  </div>

                  <p style="font-size: 15px; color: #f8f7f4; line-height: 1.6; margin-bottom: 16px;">
                    Hi there,
                  </p>

                  <p style="font-size: 14px; color: #9496a1; line-height: 1.6; margin-bottom: 20px;">
                    Thank you for requesting an invitation to <strong>iqcommune</strong>. We have logged your details for an upcoming session in <strong>${city}</strong>.
                  </p>

                  <div style="background-color: #181b24; padding: 16px; border-radius: 8px; border-left: 3px solid #c9982a; margin-bottom: 20px;">
                    <div style="font-size: 13px; color: #f8f7f4;"><strong>City:</strong> <span style="color: #e0c870;">${city}</span></div>
                    <div style="font-size: 13px; color: #f8f7f4; margin-top: 4px;"><strong>Profile:</strong> ${role}</div>
                  </div>

                  <p style="font-size: 14px; color: #9496a1; line-height: 1.6; margin-bottom: 24px;">
                    Sessions are strictly curated by city and domain to ensure real, high-value peer conversations. As soon as the room opens in ${city}, we will send your private access pass directly.
                  </p>

                  <div style="border-top: 1px solid #222; padding-top: 16px; font-size: 13px; color: #f8f7f4;">
                    <strong>InvestQ Commune Team</strong><br/>
                    <span style="font-size: 12px; color: #9496a1;">Insight Quotient — Unleashed</span>
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
