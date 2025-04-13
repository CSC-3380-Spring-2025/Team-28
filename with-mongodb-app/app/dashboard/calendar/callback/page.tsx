"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const accessToken = searchParams.get("token");
    if (!accessToken) {
      router.push("/dashboard");
      return;
    }
    localStorage.setItem("accessToken", accessToken);

    // Redirect to calendar dashboard
    // should probably rename that haha
    router.push("/dashboard/calendar/dashboard");
  }, [router, searchParams]);
  return (
    <></>
  );
}
