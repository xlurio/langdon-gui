import { DomainResponse } from "@/adapters/domains";
import Card from "@/components/containers/Card";
import { WebDirectory } from "@/types/api";
import Link from "next/link";

interface GetFullUrlFromDirectoryNDomainParams {
  domain: DomainResponse;
  web_directory: WebDirectory;
}

function getFullUrlFromDirectoryNDomain({
  domain,
  web_directory,
}: GetFullUrlFromDirectoryNDomainParams) {
  const schema = web_directory.uses_ssl ? "https" : "http";
  const path = web_directory.path.startsWith("/")
    ? web_directory.path.slice(1)
    : web_directory.path;

  return `${schema}://${domain.name}/${path}`;
}

interface DomainDetailDataProps {
  data: DomainResponse;
}

export default function DomainDetailData({ data }: DomainDetailDataProps) {
  return (
    <Card className="flex flex-col gap-12 p-6">
      <h1>{data.name}</h1>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <h2>Content</h2>
          <ul className="flex flex-col gap-3">
            {data.web_directories.map((web_directory) => (
              <Link
                key={web_directory.id}
                href={`/content?contentId=${web_directory.id}`}
              >
                <li className="bg-background p-6 rounded-xl">
                  {getFullUrlFromDirectoryNDomain({
                    domain: data,
                    web_directory,
                  })}
                </li>
              </Link>
            ))}
            {data.web_directories.length === 0 && (
              <li className="bg-background p-6 rounded-xl">No content found</li>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2>IP Addresses</h2>
          <ul className="flex flex-col gap-3">
            {data.ip_addresses.map((ipAddress) => (
              <Link
                key={ipAddress.id}
                href={`/ports?ipAddressId=${ipAddress.id}`}
              >
                <li className="bg-background p-6 rounded-xl">
                  {ipAddress.address}
                </li>
              </Link>
            ))}
            {data.ip_addresses.length === 0 && (
              <li className="bg-background p-6 rounded-xl">
                No IP adresses found
              </li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}
