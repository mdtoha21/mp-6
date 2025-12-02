import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.json({ error: "No code" });

  // Exchange code for token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
      redirect_uri: process.env.REDIRECT_URI!,
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  // Fetch user info
  const userRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const user = await userRes.json();

  // Construct absolute URL for redirect
  const redirectUrl = new URL('/dashboard', process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:3000');
  redirectUrl.searchParams.set('login', user.login);
  redirectUrl.searchParams.set('avatar', user.avatar_url);
  redirectUrl.searchParams.set('html_url', user.html_url);
  redirectUrl.searchParams.set('name', user.name || '');

  return NextResponse.redirect(redirectUrl.toString());
}
