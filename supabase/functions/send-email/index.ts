import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@3.1.0";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: corsHeaders,
        });
    }

    try {
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (!RESEND_API_KEY) {
            throw new Error("Missing RESEND_API_KEY environment variable");
        }

        const resend = new Resend(RESEND_API_KEY);
        const { type, data } = await req.json();

        if (!type || !data) {
            throw new Error("Missing required fields: type and data");
        }

        let emailData;
        if (type === "contact") {
            emailData = {
                from: "FreelanceOS <contact@freelanceos.com>",
                to: ["freelanceos2025@gmail.com"],
                subject: "New Contact Form Submission",
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          <p><strong>Timestamp:</strong> ${data.timestamp}</p>
        `,
            };
        } else if (type === "order") {
            emailData = {
                from: "FreelanceOS <orders@freelanceos.com>",
                to: ["freelanceos2025@gmail.com"],
                subject: "New Order Submission",
                html: `
          <h2>New Order Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Payment Method:</strong> ${data.payment}</p>
          <p><strong>Timestamp:</strong> ${data.timestamp}</p>
        `,
            };
        } else {
            throw new Error("Invalid email type");
        }

        const { data: result, error } = await resend.emails.send(emailData);

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify({ success: true, data: result }), {
            headers: corsHeaders,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return new Response(
            JSON.stringify({
                error: "Server error",
                message: error.message,
            }),
            { status: 500, headers: corsHeaders }
        );
    }
}); 