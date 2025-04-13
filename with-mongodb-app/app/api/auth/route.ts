import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/api/auth";
  const grandType = "authorization_code";

  const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=${grandType}`;

  const response = await fetch(url, {
    method: "POST",
  });

  const data = await response.json();
  const accessToken = data.access_token;

  return NextResponse.redirect(
    `http://localhost:3000/dashboard/calendar/callback?token=${accessToken}`
  );
}
