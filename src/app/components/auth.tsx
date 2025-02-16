"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import github from "@/app/assets/github.jpg";
import google from "@/app/assets/google.webp";
import { LabelledInput } from "@/app/components/ui/labelled-input";

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface AuthProps {
  type: "signup" | "signin";
}

export const Auth: React.FC<AuthProps> = ({ type }) => {
  const router = useRouter();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof SignupInput, value: string) => {
    setPostInputs({
      ...postInputs,
      [field]: value,
    });
  };

  const handleOAuth = async () => {
    router.push("/api/v1/user/auth");
  };

  const sendRequest = async () => {
    try {
      const body =
        type === "signup"
          ? postInputs
          : { email: postInputs.email, password: postInputs.password };

      const response = await axios.post(`api/v1/user/${type}`, body);

      const token: string = response?.data?.data?.token;

      localStorage.setItem("token", token);
      router.push("/blog");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                href={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          <div className="pt-8">
            {type === "signup" && (
              <LabelledInput
                label="Name"
                placeholder="John Doe..."
                onChange={(e) => handleChange("name", e.target.value)}
              />
            )}

            <LabelledInput
              label="Username"
              placeholder="johndoe@gmail.com"
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="123456"
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}

            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              className="flex gap-2 items-center text-white bg-blue-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={handleOAuth}
            >
              <Image
                src={google}
                alt="google"
                className="w-4 h-4 rounded-full"
              />
              {type === "signup" ? "Sign up" : "Sign in"} with Google
            </button>
            <button
              className="flex gap-2 items-center text-white bg-blue-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={handleOAuth}
            >
              <Image
                src={github}
                alt="github"
                className="w-5 h-5 rounded-full"
              />
              {type === "signup" ? "Sign up" : "Sign in"} with Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
