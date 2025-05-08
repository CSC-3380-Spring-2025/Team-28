"use client"

import GoogleOauthButton from "@/components/GoogleOauthButton"


export default function Calendar() {
  //This shows a button that will lead the user to log in with their Google account on click
  return (
      <div className="p-[2.5vh] bg-black text-white rounded-md font-bold self-center mt-[45vh] mb-[45vh]"><GoogleOauthButton /></div>
  );
}