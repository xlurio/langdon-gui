export interface IpAddress {
  id: number;
  address: string;
}

export interface Domain {
  id: number;
  name: string;
}

export interface WebDirectory {
  id: number;
  path: string;
  ip_address: IpAddress | null;
  domain: Domain | null;
  uses_ssl: boolean;
  screenshot_id: number | null;
}

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
