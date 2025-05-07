"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  //Setup
  //This params constant is used to look for optional parameters in the url
  const searchParams = useSearchParams();
  //Setup router to redirect users to proper pages
  const router = useRouter();

  useEffect(() => {
    //Get the access token from the token parameter in the url
    const accessToken = searchParams.get("token");
    //If there is no access token, return user to the dashboard
    if (!accessToken) {
      router.push("/dashboard");
      return;
    }
    //Save access token into local storage
    localStorage.setItem("accessToken", accessToken);
    //Redirect to calendar dashboard
    router.push("/dashboard/calendar/dashboard");
  }, [router, searchParams]);

  return (
    <></>
  );
}
