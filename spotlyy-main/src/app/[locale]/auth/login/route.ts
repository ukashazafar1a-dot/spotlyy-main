import { clientConfig, getClientConfig, getSession } from "@/lib/authConfig";
import * as client from "openid-client";

export async function GET() {
  try {
    const session = await getSession();
    //console.log('first sesion at start =>',session);
    let code_verifier = client.randomPKCECodeVerifier();
    let code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
    const openIdClientConfig = await getClientConfig();
    //console.log('First openIdClientConfig =>',openIdClientConfig);
    let parameters: Record<string, string> = {
      redirect_uri: clientConfig.redirect_uri,
      scope: clientConfig.scope!,
      code_challenge,
      code_challenge_method: clientConfig.code_challenge_method,
    };
    let state!: string;
    if (!openIdClientConfig.serverMetadata().supportsPKCE()) {
      state = client.randomState();
      parameters.state = state;
    }
    let redirectTo = client.buildAuthorizationUrl(
      openIdClientConfig,
      parameters
    );
    //console.log('redirectTo =>',redirectTo);
    if (redirectTo) {
      session.code_verifier = code_verifier;
      session.state = state;
      //console.log("Now session after some states =>", session);
      await session.save();
      return Response.redirect(redirectTo.href);
    } else {
      throw new Error("No redirect url");
    }
  } catch (error) {
    console.log(error);
    return Response.redirect(clientConfig.error_uri);
  }
}
