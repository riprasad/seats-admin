import { AuthenticatedUser, License, LicenseService, User } from "../service";
import {
  LicensesServiceIdBody,
  licenseServiceGetLicense,
  licenseServiceGetSeats,
  licenseServiceModifySeats,
} from "./ciam-authz";
import * as Oazapfts from "oazapfts/lib/runtime";

export class CiamAuthz implements LicenseService {
  private opts: Oazapfts.RequestOpts = { headers: { Authorization: "token" } };

  constructor(baseUrl?: string) {
    this.opts.baseUrl = baseUrl || "";
  }

  async get({ orgId, serviceId }: AuthenticatedUser): Promise<License> {
    const result = await licenseServiceGetLicense(orgId, serviceId, this.opts);
    return {
      available: result.seatsAvailable || 0,
      total: result.seatsTotal || 0,
    };
  }

  async seats(
    { orgId, serviceId }: AuthenticatedUser,
    assigned: boolean | undefined = true
  ): Promise<User[]> {
    const result = await licenseServiceGetSeats(
      orgId,
      serviceId,
      { filter: assigned ? "assigned" : "assignable" },
      this.opts
    );
    return (
      result.users?.map(({ id, displayName, assigned }) => ({
        id: id || "",
        name: displayName || "",
        assigned: !!assigned,
      })) || []
    );
  }

  async assign(user: AuthenticatedUser, userIds: string[]): Promise<void> {
    const body: LicensesServiceIdBody = { assign: userIds };
    await this.modify(user, body);
    return;
  }

  async unAssign(user: AuthenticatedUser, userIds: string[]): Promise<void> {
    const body: LicensesServiceIdBody = { unassign: userIds };
    await this.modify(user, body);
    return;
  }

  private async modify(
    { orgId, serviceId }: AuthenticatedUser,
    body: LicensesServiceIdBody
  ): Promise<any> {
    return licenseServiceModifySeats(orgId, serviceId, body, this.opts);
  }
}
