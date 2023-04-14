import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { License, LicenseService, User } from "../service";
import { Entitlements } from "./entitlements";
import {
  AccessTokenProvider,
  AllowedHostsValidator,
  BaseBearerTokenAuthenticationProvider,
} from "@microsoft/kiota-abstractions";
import { SeatRequest } from "./models";

export class EntitlementsService implements LicenseService {
  private client: Entitlements;
  private accessTokenProvider: AccessTokenProvider;

  constructor(baseUrl?: string) {
    this.accessTokenProvider = new TokenProvider();
    const adapter = new FetchRequestAdapter(
      new BaseBearerTokenAuthenticationProvider(this.accessTokenProvider)
    );
    adapter.baseUrl = baseUrl || "";
    this.client = new Entitlements(adapter);
  }

  async get(orgId: string, serviceId: string): Promise<License> {
    const result = await this.client.seats.get();
    return { total: result?.consumed || 0, available: result?.allowed || 0 };
  }

  async seats(
    orgId: string,
    serviceId: string,
    assigned?: boolean | undefined
  ): Promise<User[]> {
    const result = await this.client.seats.get();

    if (!result?.data) {
      return [];
    }

    return result.data.map(({ subscription_id, account_username }) => ({
      id: subscription_id!,
      name: account_username!,
      assigned: true,
    }));
  }

  async assign(
    orgId: string,
    serviceId: string,
    userIds: string[]
  ): Promise<void> {
    const body = new SeatRequest();
    body.account_username = userIds[0];
    await this.client.seats.post(body);
    return;
  }

  async unAssign(
    orgId: string,
    serviceId: string,
    userIds: string[]
  ): Promise<void> {
    await this.client.seatsById(userIds[0]).delete();
    return;
  }
}

class TokenProvider implements AccessTokenProvider {
  getAuthorizationToken(
    url?: string | undefined,
    additionalAuthenticationContext?: Record<string, unknown> | undefined
  ): Promise<string> {
    return Promise.resolve("dummy");
  }

  getAllowedHostsValidator(): AllowedHostsValidator {
    return new AllowedHostsValidator(new Set());
  }
}
