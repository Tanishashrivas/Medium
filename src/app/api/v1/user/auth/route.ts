import { NextResponse } from "next/server";

export async function GET() {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=email%20profile`;

  return NextResponse.redirect(authUrl);
}
