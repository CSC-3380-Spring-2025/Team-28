import { NextRequest, NextResponse } from "next/server";

//This allows the user to log into their Google account...
//...and associate their account to properly send an event to their Google Calendar
export async function GET(request: NextRequest) {
  //Fetches a code after the user logs into Google
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  //Fetch the client ID & client secret from the .env file
  const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  //Has to match what is declared in the Google developer console
  const redirectUri = "http://localhost:3000/api/auth";
  //A grant type - exchange authorization code for access token
  const grantType = "authorization_code";

  //Here, the auth code is exchanged for an access token and user's google data can be accessed
  const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=${grantType}`;
  const response = await fetch(url, {
    method: "POST",
  });
  const data = await response.json();
  const accessToken = data.access_token;

  //Redirects user to the callback page before going to the calendar dashboard
  return NextResponse.redirect(
    `http://localhost:3000/dashboard/calendar/callback?token=${accessToken}`
  );
}
