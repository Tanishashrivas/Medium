"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const OAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  console.log("this page was called oauth");

  useEffect(() => {
    const fetchOAuthData = async () => {
      const response = await axios(`/api/v1/user/auth/callback?code=${code}`);
      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);

        router.push(data.redirect || "/blog");
      } else {
        console.error("Failed to authenticate");
        router.push("/signin");
      }
    };

    fetchOAuthData();
  }, [router]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
