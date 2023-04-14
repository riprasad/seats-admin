import { MockService } from "./api/mock-service";
import { CiamAuthz } from "./api/ciam-service";
import { EntitlementsService } from "./entitlements-api/entitlements-service";

export type License = {
  available: number;
  total: number;
};

export type User = {
  id: string;
  name: string;
  assigned: boolean;
};

export interface LicenseService {
  get(orgId: string, serviceId: string): Promise<License>;

  seats(orgId: string, serviceId: string, assigned?: boolean): Promise<User[]>;

  assign(orgId: string, serviceId: string, userIds: string[]): Promise<void>;

  unAssign(orgId: string, serviceId: string, userIds: string[]): Promise<void>;
}

export function getService(serviceKey: string, baseUrl?: string): LicenseService {
  switch (serviceKey) {
    case "CIAM_Authz":
      return new CiamAuthz(baseUrl);
    case "entitlements":
      return new EntitlementsService(baseUrl);
    case "mock":
      return new MockService();
    default:
      throw new Error("no implementation found for " + serviceKey);
  }
}
