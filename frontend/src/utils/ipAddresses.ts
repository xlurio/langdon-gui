import { IpAddressVersion } from "@/types/api";

interface MakeNetlocFromPortParams {
  port: {
    port: number;
    ip_address: {
      address: string;
      version: IpAddressVersion;
    };
  };
}

export function makeNetlocFromPort({ port }: MakeNetlocFromPortParams) {
  if (port.ip_address.version === "ipv4") {
    return `${port.ip_address.address}:${port.port}`;
  }

  return `[${port.ip_address.address}]:${port.port}`;
}
