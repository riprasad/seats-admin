import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";

import { CheckRequestBuilderPostRequestConfiguration } from "./v1alpha/check/checkRequestBuilderPostRequestConfiguration";
import { License, LicenseService, User } from "../service";
import { Licenses_serviceId_body } from "./models";
import { Authz } from "./authz";

export class CiamAuthz implements LicenseService {
  private client: Authz;
  private requestConfiguration;

  constructor(baseUrl?: string) {
    const adapter = new FetchRequestAdapter(
      new AnonymousAuthenticationProvider()
    );
    adapter.baseUrl = baseUrl || "";
    this.client = new Authz(adapter);
    this.requestConfiguration =
      new CheckRequestBuilderPostRequestConfiguration();
    this.requestConfiguration.headers = { Authorization: ["token"] };
  }

  async get(orgId: string, serviceId: string): Promise<License> {
    const result = await this.client.v1alpha
      .orgsById(orgId)
      .licensesById(serviceId)
      .get(this.requestConfiguration);
    return {
      available: result?.seatsAvailable || 0,
      total: result?.seatsTotal || 0,
    };
  }

  async seats(
    orgId: string,
    serviceId: string,
    assigned: boolean | undefined = true
  ): Promise<User[]> {
    const result = await this.client.v1alpha
      .orgsById(orgId)
      .licensesById(serviceId)
      .seats.get({
        headers: this.requestConfiguration.headers,
        queryParameters: { filter: assigned ? "assigned" : "assignable" },
      });
    return (
      result?.users?.map(({ id, displayName, assigned }) => ({
        id: id || "",
        name: displayName || "",
        assigned: !!assigned,
      })) || []
    );
  }

  async assign(
    orgId: string,
    serviceId: string,
    userIds: string[]
  ): Promise<void> {
    const body = new Licenses_serviceId_body();
    body.assign = userIds;
    await this.modify(orgId, serviceId, body);
    return;
  }

  async unAssign(
    orgId: string,
    serviceId: string,
    userIds: string[]
  ): Promise<void> {
    const body = new Licenses_serviceId_body();
    body.unassign = userIds;
    await this.modify(orgId, serviceId, body);
    return;
  }

  private async modify(
    orgId: string,
    serviceId: string,
    body: Licenses_serviceId_body
  ): Promise<void> {
    this.client.v1alpha
      .orgsById(orgId)
      .licensesById(serviceId)
      .post(body, this.requestConfiguration);
  }
}
