import {
  BaseBearerTokenAuthenticationProvider,
  AccessTokenProvider,
  AllowedHostsValidator,
  AnonymousAuthenticationProvider,
} from "@microsoft/kiota-abstractions";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";

import { Authz } from "./api/authz";
import { V1alphaCheckPermissionRequest } from "./api/models";
import { V1alphaCheckPermissionResponse401Error } from "./api/v1alpha/check";
import { CheckRequestBuilderPostRequestConfiguration } from "./api/v1alpha/check/checkRequestBuilderPostRequestConfiguration";

// class Seats implements AccessTokenProvider {
//   public getAuthorizationToken(
//     url?: string | undefined,
//     additionalAuthenticationContext?: Record<string, unknown> | undefined
//   ): Promise<string> {
//     return Promise.resolve("token");
//   }

//   public getAllowedHostsValidator(): AllowedHostsValidator {
//     return new AllowedHostsValidator();
//   }
// }

// class SeatsIdentityAuthenticationProvider extends BaseBearerTokenAuthenticationProvider {
//   public getAuthorizationToken() {
//     return "token";
//   }
// }

// const adapter = new FetchRequestAdapter(
//   new SeatsIdentityAuthenticationProvider(new Seats())
// );

const adapter = new FetchRequestAdapter(new AnonymousAuthenticationProvider());
const client = new Authz(adapter);

export async function checkPermission(): Promise<void> {
  try {
    const request = new V1alphaCheckPermissionRequest();
    request.subject = "okay";
    request.operation = "use";
    request.resourcetype = "Feature";
    request.resourceid = "Wisdom";

    const requestConfiguration =
      new CheckRequestBuilderPostRequestConfiguration();
    requestConfiguration.headers = { Authorization: ["token"] };

    const result = await client.v1alpha.check.post(request, requestConfiguration);
    console.log(result);
  } catch (err) {
    // console.log(err);
    console.log(
      "what",
      (err as V1alphaCheckPermissionResponse401Error).additionalData
    );
  }
}

(async () => {
  const requestConfiguration =
      new CheckRequestBuilderPostRequestConfiguration();
    requestConfiguration.headers = { Authorization: ["token"] };
  const result = await client.v1alpha
      .orgsById("12")
      .licensesById("12")
      .seats.get({
        headers: requestConfiguration.headers,
        queryParameters: { filter: true ? "assigned" : "assignable" },
      });
    console.log (
      result?.users?.map(({ id, displayName, assigned }) => ({
        id,
        name: displayName,
        assigned,
      })) || []
    );
})()

checkPermission();
