import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BadRequestError, InternalServerError } from "@/app/utils/response";
import { prisma } from "@/app/utils/prisma-client";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return BadRequestError("Code not found")({});

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        code,
        redirect_uri: process.env.REDIRECT_URI!,
        grant_type: "authorization_code",
      })
    );

    const access_token = tokenResponse.data.access_token;

    const { data: userData } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!userData.email) {
      return NextResponse.json(
        { error: "Failed to get user details" },
        { status: 500 }
      );
    }

    const user = await saveUser(userData);
    console.log(user);

    const token = await jwt.sign({ id: userData.id }, secret!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { token, redirect: "/blog" },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return InternalServerError("Authentication failed")({ error: error });
  }
}

async function saveUser(userData) {
  const user = await prisma.user.upsert({
    where: { email: userData.email },
    update: {
      name: userData.name,
    },
    create: {
      email: userData.email,
      name: userData.name,
      password: "", // OAuth users don’t use passwords
    },
  });
  return user;
}
