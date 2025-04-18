import { WebDirectory } from "@/types/api";

export function getFullUrlFromDirectory({
  webDirectory,
}: {
  webDirectory: WebDirectory;
}) {
  const schema = webDirectory.uses_ssl ? "https" : "http";
  const hostname = webDirectory.domain
    ? webDirectory.domain.name
    : webDirectory.ip_address!.address;
  const path = webDirectory.path.startsWith("/")
    ? webDirectory.path.slice(1)
    : webDirectory.path;

  return `${schema}://${hostname}/${path}`;
}
