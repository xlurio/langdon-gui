import { IpAddress, WebDirectory } from "@/types/api";

interface GetTechnologyByIdParams {
  id: number;
}

interface UsedPort {
  id: number;
  port: number;
  ip_address: IpAddress;
}

interface Vulnerability {
  id: number;
  name: string;
}

export interface TechnologyResponse {
  id: number;
  name: string;
  version: string;
  used_ports: UsedPort[];
  web_directories: WebDirectory[];
  vulnerabilities: Vulnerability[];
}

export async function getTechnologyById({
  id,
}: GetTechnologyByIdParams): Promise<TechnologyResponse> {
  const response = await fetch(`/api/technologies/${id}`);

  return response.json();
}
