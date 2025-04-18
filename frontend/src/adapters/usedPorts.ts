import { Technology, UsedPortWIpAddress } from "@/types/api";

interface GetUsedPortByIdParams {
  id: number;
}

export interface UsedPortResponse extends UsedPortWIpAddress {
  technologies: Technology[];
}

export async function getUsedPortById({
  id,
}: GetUsedPortByIdParams): Promise<UsedPortResponse> {
  const response = await fetch(`/api/usedports/${id}`);

  return response.json();
}
