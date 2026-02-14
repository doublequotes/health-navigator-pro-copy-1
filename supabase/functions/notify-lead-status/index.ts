import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { lead_id, old_status, new_status } = await req.json();

    if (!lead_id || !new_status) {
      return new Response(JSON.stringify({ error: "Missing lead_id or new_status" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch the lead
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", lead_id)
      .single();

    if (leadError || !lead) {
      return new Response(JSON.stringify({ error: "Lead not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const patientEmail = lead.email;
    const patientName = lead.full_name || "Patient";
    const treatment = lead.treatment_category?.replace(/_/g, " ") || "your treatment";

    const statusMessages: Record<string, string> = {
      contacted: "Our team has reviewed your enquiry and will be reaching out to you shortly.",
      qualified: "Great news! Your enquiry has been qualified and we're matching you with the best hospitals.",
      converted: "Your treatment plan is confirmed! We'll send you the full details soon.",
      closed: "Your enquiry has been closed. If you have questions, please submit a new enquiry.",
      withdrawn: "Your enquiry has been withdrawn as requested.",
    };

    const message = statusMessages[new_status] || `Your enquiry status has been updated to: ${new_status}`;

    // Use Lovable AI gateway to generate a nice email body
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    let emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1a5c52 0%, #2d8a7e 100%); padding: 20px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">MedVoyage</h1>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1a1a1a; margin-top: 0;">Enquiry Status Update</h2>
          <p style="color: #555;">Hi ${patientName},</p>
          <p style="color: #555;">${message}</p>
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 4px 0; color: #333;"><strong>Treatment:</strong> ${treatment}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Previous Status:</strong> ${old_status || "new"}</p>
            <p style="margin: 4px 0; color: #333;"><strong>New Status:</strong> ${new_status}</p>
          </div>
          <p style="color: #555;">If you have questions, simply reply to this email or submit a new enquiry on our website.</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">© 2026 MedVoyage. All rights reserved.</p>
        </div>
      </div>
    `;

    // Log the notification (in production, integrate with an email service)
    console.log(`📧 Email notification to ${patientEmail}: Status changed from ${old_status} to ${new_status}`);

    // Log to audit
    await supabase.from("audit_logs").insert({
      action: "lead_status_change_notification",
      table_name: "leads",
      record_id: lead_id,
      new_values: { old_status, new_status, notified_email: patientEmail },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Notification logged for ${patientEmail}`,
        email_body: emailBody,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
