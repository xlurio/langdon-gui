import { IpAddress, WebDirectory } from "@/types/api";

interface GetDomainByIdParams {
  id: number;
}

export interface DomainResponse {
  id: number;
  name: string;
  web_directories: WebDirectory[]
  ip_addresses: IpAddress[]
}

export async function getDomainById({
  id,
}: GetDomainByIdParams): Promise<DomainResponse> {
  const response = await fetch(`/api/domains/${id}`);

  return response.json();
}
