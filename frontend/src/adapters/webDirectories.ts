import { IpAddress, Domain, Technology, HttpHeader, HttpCookie } from "@/types/api";

interface GetByWebDirectoryIdParams {
  id: number;
}

export interface WebDirectoryResponse {
  id: number;
  path: string;
  uses_ssl: boolean;
  domain: Domain | null;
  ip_address: IpAddress | null;
  screenshot_id: number | null;
}

export async function getWebDirectoryById({
  id,
}: GetByWebDirectoryIdParams): Promise<WebDirectoryResponse> {
  const response = await fetch(`/api/webdirectories/${id}`);

  return response.json();
}


export async function getTechnologiesByWebDirectoryId({
  id,
}: GetByWebDirectoryIdParams): Promise<Technology[]> {
  const response = await fetch(`/api/webdirectories/${id}/technologies`);

  return response.json();
}


export async function getHeadersByWebDirectoryId({
  id,
}: GetByWebDirectoryIdParams): Promise<HttpHeader[]> {
  const response = await fetch(`/api/webdirectories/${id}/httpheaders`);

  return response.json();
}

export async function getCookiesByWebDirectoryId({
  id,
}: GetByWebDirectoryIdParams): Promise<HttpCookie[]> {
  const response = await fetch(`/api/webdirectories/${id}/httpcookies`);

  return response.json();
}
