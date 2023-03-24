import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { Authz } from "./client/authz";
import { V1alphaCheckPermissionRequest } from "./client/models";
import { V1alphaCheckPermissionResponse401Error } from "./client/v1alpha/check";

const adapter = new FetchRequestAdapter(new AnonymousAuthenticationProvider());
const client = new Authz(adapter);

async function test(): Promise<void> {
  try {
    const request = new V1alphaCheckPermissionRequest();
    request.subject = "okay";
    request.operation = "use";
    request.resourcetype = "Feature";
    request.resourceid = "Some";
    const result = await client.v1alpha.check.post(request);
    console.log(result);
  } catch (err) {
    // console.log(err);
    console.log("what", (err as V1alphaCheckPermissionResponse401Error).additionalData);
  }
}

test();
