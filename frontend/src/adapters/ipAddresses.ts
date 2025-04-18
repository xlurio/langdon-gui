import {
  Domain,
  IpAddress,
  PaginatedResponse,
  UsedPortWIpAddress,
  WebDirectory,
} from "@/types/api";

interface GetByIpAddressIdParams {
  id: number;
}

interface PaginatedListByIpAddressParams extends GetByIpAddressIdParams {
  page?: number;
}

export async function getIpAddressById({
  id,
}: GetByIpAddressIdParams): Promise<IpAddress> {
  const response = await fetch(`/api/ipaddresses/${id}`);

  return response.json();
}

export async function getDomainsByIpAddressId({
  id,
  page,
}: PaginatedListByIpAddressParams): Promise<PaginatedResponse<Domain>> {
  const response = await fetch(`/api/ipaddresses/${id}/domains?page=${page}`);

  return response.json();
}

export async function getPortsByIpAddressId({
  id,
}: GetByIpAddressIdParams): Promise<UsedPortWIpAddress[]> {
  const response = await fetch(`/api/ipaddresses/${id}/usedports`);

  return response.json();
}

export async function getWebDirectoriesByIpAddressId({
  id,
  page,
}: PaginatedListByIpAddressParams): Promise<PaginatedResponse<WebDirectory>> {
  const response = await fetch(
    `/api/ipaddresses/${id}/webdirectories?page=${page}`
  );

  return response.json();
}
