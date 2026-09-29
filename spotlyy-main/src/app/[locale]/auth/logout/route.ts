import {
  clientConfig,
  defaultSession,
  getClientConfig,
  getSession,
} from "@/lib/authConfig";
import * as client from "openid-client";

export async function GET() {
  const session = await getSession();
  try {
    const openIdClientConfig = await getClientConfig();
    const endSessionUrl = client.buildEndSessionUrl(openIdClientConfig, {
      post_logout_redirect_uri: clientConfig.post_logout_redirect_uri,
      id_token_hint: session.access_token!,
    });
    //console.log(endSessionUrl);
    session.destroy();
    return Response.redirect(endSessionUrl.href);
  } catch (error) {
    console.log(error);
  } finally {
    session.destroy();
    return Response.redirect(clientConfig.post_login_route);
  }
  //return Response.redirect(new URL("/", clientConfig.post_login_route));
}
