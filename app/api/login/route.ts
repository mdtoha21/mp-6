import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.REDIRECT_URI!,
    scope: "read:user user:email",
    allow_signup: "true",    // allow new users to sign up
    prompt: "consent",       // force GitHub to show the authorization screen
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );
}
