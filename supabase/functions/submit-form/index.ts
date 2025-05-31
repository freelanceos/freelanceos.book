// submit-form Edge Function to Google Sheets using JWT

import { serve } from "https://deno.land/std/http/server.ts";
import { create, getNumericDate, Header, Payload } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

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
    const SHEET_ID = Deno.env.get("SHEET_ID");
    const CLIENT_EMAIL = Deno.env.get("CLIENT_EMAIL");
    const PRIVATE_KEY = Deno.env.get("PRIVATE_KEY")?.replace(/\\n/g, "\n");

    if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      throw new Error("Missing required environment variables");
    }

    // Verify PRIVATE_KEY format
    if (!PRIVATE_KEY.includes("-----BEGIN PRIVATE KEY-----") || 
        !PRIVATE_KEY.includes("-----END PRIVATE KEY-----")) {
      throw new Error("Invalid private key format. Must be in PKCS8 format.");
    }

    const body = await req.json().catch(() => null);
    if (!body) throw new Error("Invalid JSON body");

    const { name, email, phone, payment, timestamp } = body;

    if (!name || !email || !phone || !payment || !timestamp) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
          details: { name, email, phone, payment, timestamp },
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const jwt = await createJWT(CLIENT_EMAIL, PRIVATE_KEY);

    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:E:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[name, email, phone, payment, timestamp]],
        }),
      }
    );

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text();
      throw new Error(`Google Sheets API error: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: corsHeaders,
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Server error",
        message: error.message,
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});

async function createJWT(clientEmail: string, privateKey: string): Promise<string> {
  const header: Header = {
    alg: "RS256",
    typ: "JWT",
  };

  const payload: Payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: getNumericDate(0),
    exp: getNumericDate(60 * 60),
  };

  try {
    const key = await crypto.subtle.importKey(
      "pkcs8",
      pemToArrayBuffer(privateKey),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      false,
      ["sign"]
    );

    return await create(header, payload, key);
  } catch (error) {
    console.error("JWT creation error:", error);
    throw new Error(`Failed to create JWT: ${error.message}`);
  }
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const cleaned = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\n/g, "")
    .trim();
  const binary = atob(cleaned);
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}