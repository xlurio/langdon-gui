import { UsedPortWIpAddress, WebDirectoryWIpNDomain } from "@/types/api";

interface GetTechnologyByIdParams {
  id: number;
}



interface Vulnerability {
  id: number;
  name: string;
}

export interface TechnologyResponse {
  id: number;
  name: string;
  version: string;
  used_ports: UsedPortWIpAddress[];
  web_directories: WebDirectoryWIpNDomain[];
  vulnerabilities: Vulnerability[];
}

export async function getTechnologyById({
  id,
}: GetTechnologyByIdParams): Promise<TechnologyResponse> {
  const response = await fetch(`/api/technologies/${id}`);

  return response.json();
}
