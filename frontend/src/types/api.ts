export type IpAddressVersion = "ipv4" | "ipv6";

export interface IpAddress {
  id: number;
  address: string;
  version: IpAddressVersion;
}

export interface Domain {
  id: number;
  name: string;
}

export interface WebDirectory {
  id: number;
  path: string;
  uses_ssl: boolean;
  screenshot_id: number | null;
}

export interface WebDirectoryWDomain extends WebDirectory {
  domain: Domain | null;
}

export interface WebDirectoryWIpAddress extends WebDirectory {
  ip_address: IpAddress | null;
}

export interface WebDirectoryWIpNDomain
  extends WebDirectoryWIpAddress,
    WebDirectoryWDomain {}

export interface Technology {
  id: number;
  name: string;
  version: string | null;
}

export interface HttpHeader {
  id: number;
  name: string;
}

export interface HttpCookie {
  id: number;
  name: string;
}

export interface UsedPort {
  id: number;
  port: number;
}

export interface UsedPortWIpAddress extends UsedPort {
  id: number;
  port: number;
  ip_address: IpAddress;
}

export interface PaginatedResponse<T> {
  count: number;
  next: number | null;
  results: T[];
}
