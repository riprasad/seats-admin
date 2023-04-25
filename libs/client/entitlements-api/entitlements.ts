import { AuthenticatedUser, License, LicenseService, User } from "../service";
import { deleteSeatsById, getSeats, postSeats } from "./entitlements-service";
import * as Oazapfts from "oazapfts/lib/runtime";

export class EntitlementsService implements LicenseService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || "";
  }

  private async header(user: AuthenticatedUser): Promise<Oazapfts.RequestOpts> {
    return {
      headers: {
        Authorization: `Bearer ${await user.token()}`,
        baseUrl: this.baseUrl,
      },
    };
  }

  async get(user: AuthenticatedUser): Promise<License> {
    const result = await getSeats(
      {
        limit: 10,
        offset: 0,
      },
      await this.header(user)
    );
    return {
      available: result.allowed || 0,
      total: result.consumed || 0,
    };
  }

  async seats(
    user: AuthenticatedUser,
    assigned?: boolean | undefined
  ): Promise<User[]> {
    const result = await getSeats(
      {
        limit: 10,
        offset: 0,
      },
      await this.header(user)
    );
    
    return result.data.map(({ subscription_id, account_username }) => ({
      id: subscription_id || "",
      name: account_username || "",
      assigned: true,
    }));
  }

  async assign(user: AuthenticatedUser, userIds: string[]): Promise<void> {
    await Promise.all(
      userIds.map(async (id) =>
        postSeats({ account_username: id }, await this.header(user))
      )
    );
    return Promise.resolve();
  }

  async unAssign(user: AuthenticatedUser, userIds: string[]): Promise<void> {
    await Promise.all(
      userIds.map(async (id) => deleteSeatsById(id, await this.header(user)))
    );
    return Promise.resolve();
  }
}
