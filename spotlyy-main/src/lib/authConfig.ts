import { IronSession, SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";
import * as client from "openid-client";

const Site_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

export const clientConfig = {
  url: process.env.NEXT_PUBLIC_AUTH_SERVER_URL as string,
  audience: process.env.NEXT_PUBLIC_AUTH_SERVER_URL as string,
  client_id: "nextjs-dev-app",
  client_secret: "your-dev-client-secret",
  scope: "openid profile email role offline_access",
  redirect_uri: `${Site_URL}/auth/callback`,
  post_logout_redirect_uri: Site_URL,
  response_type: "code",
  grant_type: "authorization_code",
  post_login_route: Site_URL,
  code_challenge_method: "S256",
  error_uri: `${Site_URL}/auth/error`,
};

export interface SessionData {
  isLoggedIn: boolean;
  access_token?: string;
  code_verifier?: string;
  id_token?: string;
  expires_in?: number;
  state?: string;
  userInfo?: client.UserInfoResponse | null;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  code_verifier: undefined,
  access_token: undefined,
  id_token: undefined,
  expires_in: undefined,
  state: undefined,
  userInfo: undefined,
};

// Generate a complex_password_at_least_32_characters_long
const password = "shRBaHewmP5EC7Wp3zyVzvyYtEvwrr8Q";

export const sessionOptions: SessionOptions = {
  password,
  cookieName: "next_js_session",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 60 * 60 * 24 * 7, // 1 week
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookiesList = await cookies();
  let session = await getIronSession<SessionData>(cookiesList, sessionOptions);
  if (!session.isLoggedIn) {
    session.access_token = defaultSession.access_token;
    session.userInfo = defaultSession.userInfo;
  }
  return session;
}

export async function getClientConfig() {
  return await client.discovery(
    new URL(clientConfig.url!),
    clientConfig.client_id!
  );
}
