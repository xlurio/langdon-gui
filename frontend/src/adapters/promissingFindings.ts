import { PaginatedResponse } from "@/types/api";

export interface PromissingFindingsResult {
  id: number;
  label: string;
  type:  "domain" | "technology" | "used_port" | "vulnerability" | "web_directory";
}

interface GetPromissingFindingsParams {
  page?: number;
}

export default async function getPromissingFindings({
  page,
}: GetPromissingFindingsParams): Promise<PaginatedResponse<PromissingFindingsResult>> {
  const response = await fetch(`/api/promissingfindings?page=${page}`);

  return response.json();
}
