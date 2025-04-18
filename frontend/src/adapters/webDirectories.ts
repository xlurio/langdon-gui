import { Technology, HttpHeader, HttpCookie, WebDirectoryWIpNDomain } from "@/types/api";

interface GetByWebDirectoryIdParams {
  id: number;
}

export async function getWebDirectoryById({
  id,
}: GetByWebDirectoryIdParams): Promise<WebDirectoryWIpNDomain> {
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
