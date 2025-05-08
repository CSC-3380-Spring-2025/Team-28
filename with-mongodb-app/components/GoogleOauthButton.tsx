export default function GoogleOauthButton() {
  //Get the client ID, redirect URI, type of response to be returned, and the scope of access to the user's calendar
  const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;
  const redirectUri = "http://localhost:3000/api/auth";
  const responseType = "code";
  const scope = [
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
  ].join(" ");

  //Redirection to the Google login page
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

  //Show a message to encourage user to click on the button
  return (
    <>
      <a href={url}>Sign in with Google</a>
    </>
  );
}