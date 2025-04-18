import { DomainResponse } from "@/adapters/domains";
import Card from "@/components/containers/Card";
import { Domain, WebDirectory } from "@/types/api";
import IpAddressActions from "../ipAddresses/IpAddressActions";
import WebDirectoryList from "../webDirectories/WebDirectoryList";
import WebDirectoryListItem from "../webDirectories/WebDirectoryListItem";

interface GetFullUrlFromDirectoryNDomainParams {
  domain: Domain;
  webDirectory: WebDirectory;
}

function getFullUrlFromDirectoryNDomain({
  domain,
  webDirectory,
}: GetFullUrlFromDirectoryNDomainParams) {
  const schema = webDirectory.uses_ssl ? "https" : "http";
  const path = webDirectory.path.startsWith("/")
    ? webDirectory.path.slice(1)
    : webDirectory.path;

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
        <WebDirectoryList
          webDirectories={data.web_directories}
          renderItem={(webDirectory) => (
            <WebDirectoryListItem
              key={webDirectory.id}
              url={getFullUrlFromDirectoryNDomain({
                domain: data,
                webDirectory: webDirectory,
              })}
              webDirectory={webDirectory}
            />
          )}
        />
        <div className="flex flex-col gap-4 w-full">
          <h2>IP Addresses</h2>
          <ul className="flex flex-col gap-3">
            {data.ip_addresses.map((ipAddress) => (
              <li
                key={ipAddress.id}
                className="flex flex-row justify-between bg-background p-6 rounded-xl items-center"
              >
                {ipAddress.address}
                <IpAddressActions ipAddress={ipAddress} />
              </li>
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
