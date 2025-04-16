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

interface GetTechnologiesParams {
  page?: number;
}

export interface TechnologiesResult {
  id: number;
  name: string;
  version: string;
}

export interface TechnologiesResponse {
  count: number;
  next: number | null;
  results: TechnologiesResult[];
}

export async function getTechnologies({
  page,
}: GetTechnologiesParams): Promise<TechnologiesResponse> {
  const _cleanedPage = page ? page : 0;

  return {
    count: 100,
    next: null,
    results: [],
  };
}

export async function getTechnologyById({
  id,
}: GetTechnologyByIdParams): Promise<TechnologyResponse> {
  const response = await fetch(`/api/technologies/${id}`);

  return response.json();
}
