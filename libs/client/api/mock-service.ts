import { License, LicenseService, User } from "../service";

export class MockService implements LicenseService {
  async get(orgId: string, serviceId: string): Promise<License> {
    return (await fetch('/aw-api/subscriptions')).json();
  }

  async seats(orgId: string, serviceId: string, assigned?: boolean | undefined): Promise<User[]> {
    return (await fetch('/aw-api/users')).json();
  }

  assign(orgId: string, serviceId: string, userIds: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  unAssign(orgId: string, serviceId: string, userIds: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}