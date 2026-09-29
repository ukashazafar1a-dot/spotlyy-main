import { clientConfig, getClientConfig, getSession } from "@/lib/authConfig";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import * as client from "openid-client";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const openIdClientConfig = await getClientConfig();
    const headerList = await headers();
    const host =
      headerList.get("x-forwarded-host") ||
      headerList.get("host") ||
      "localhost";
    const protocol = headerList.get("x-forwarded-proto") || "https";
    const currentUrl = new URL(
      `${protocol}://${host}${request.nextUrl.pathname}${request.nextUrl.search}`
    );
    //console.log("current url", currentUrl);
    //console.log("session", session);
    //console.log("openIdClientConfig", openIdClientConfig);
    const tokenSet = await client.authorizationCodeGrant(
      openIdClientConfig,
      currentUrl,
      {
        pkceCodeVerifier: session.code_verifier,
        expectedState: session.state,
      }
    );
    //console.log("tokenset", tokenSet);
    if (tokenSet) {
      const { access_token, id_token, expires_in } = tokenSet;
      let claims = tokenSet.claims()!;
      const { sub } = claims;
      try {
        // call userinfo endpoint to get user info
        const userinfo = await client.fetchUserInfo(
          openIdClientConfig,
          access_token,
          sub
        );
        //console.log("user info", userinfo);
        if (userinfo) {
          // store userinfo in session
          session.isLoggedIn = true;
          session.access_token = access_token;
          session.id_token = id_token;
          session.expires_in = expires_in;
          session.userInfo = {
            ...session.userInfo,
            ...userinfo,
          };
          await session.save();
          return Response.redirect(clientConfig.post_login_route);
        } else {
          throw new Error("User info not found");
        }
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }
    } else {
      throw new Error("TokenSet not found");
    }
  } catch (error) {
    console.log(error);
    return Response.redirect(clientConfig.error_uri);
  }
}
