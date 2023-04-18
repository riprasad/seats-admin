import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { AuthenticatedUser, License, LicenseService, User } from "../service";
import { Entitlements } from "./entitlements";
import {
  AccessTokenProvider,
  AllowedHostsValidator,
  BaseBearerTokenAuthenticationProvider,
} from "@microsoft/kiota-abstractions";
import { SeatRequest } from "./models";

export class EntitlementsService implements LicenseService {
  private client: Entitlements;
  private accessTokenProvider: TokenProvider;

  constructor(baseUrl?: string) {
    this.accessTokenProvider = new TokenProvider();
    const adapter = new FetchRequestAdapter(
      new BaseBearerTokenAuthenticationProvider(this.accessTokenProvider)
    );
    adapter.baseUrl = baseUrl || "";
    this.client = new Entitlements(adapter);
  }

  async get(user: AuthenticatedUser): Promise<License> {
    this.accessTokenProvider.user = user;
    const result = await this.client.seats.get();
    return { total: result?.consumed || 0, available: result?.allowed || 0 };
  }

  async seats(
    user: AuthenticatedUser,
    assigned?: boolean | undefined
  ): Promise<User[]> {
    this.accessTokenProvider.user = user;
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
    user: AuthenticatedUser,
    userIds: string[]
  ): Promise<void> {
    this.accessTokenProvider.user = user;
    const body = new SeatRequest();
    body.account_username = userIds[0];
    await this.client.seats.post(body);
    return;
  }

  async unAssign(
    user: AuthenticatedUser,
    userIds: string[]
  ): Promise<void> {
    this.accessTokenProvider.user = user;
    await this.client.seatsById(userIds[0]).delete();
    return;
  }
}

class TokenProvider implements AccessTokenProvider {

  private _user: AuthenticatedUser | undefined;

  public set user(user: AuthenticatedUser) {
    this._user = user;
  }


  getAuthorizationToken(
    url?: string | undefined,
    additionalAuthenticationContext?: Record<string, unknown> | undefined
  ): Promise<string> {
    return this._user!.token();
  }

  getAllowedHostsValidator(): AllowedHostsValidator {
    return new AllowedHostsValidator(new Set());
  }
}
