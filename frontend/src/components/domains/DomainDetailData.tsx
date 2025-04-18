import { DomainResponse } from "@/adapters/domains";
import Card from "@/components/containers/Card";
import { WebDirectory } from "@/types/api";
import WebDirectoryScreenshotProvider from "../webDirectories/WebDirectoryScreenshotProvider";
import WebDirectoryActions from "../webDirectories/WebDirectoryActions";
import IpAddressActions from "../ipAddresses/IpAddressActions";

interface GetFullUrlFromDirectoryNDomainParams {
  domain: DomainResponse;
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
        <div className="flex flex-col gap-4 w-full">
          <h2>Content</h2>
          <ul className="flex flex-col gap-3">
            <WebDirectoryScreenshotProvider>
              {data.web_directories.map((webDirectory) => (
                <li
                  key={webDirectory.id}
                  className="bg-background p-6 rounded-xl flex flex-row justify-between items-center"
                >
                  {getFullUrlFromDirectoryNDomain({
                    domain: data,
                    webDirectory: webDirectory,
                  })}
                  <WebDirectoryActions
                    webDirectory={webDirectory}
                  />
                </li>
              ))}
              {data.web_directories.length === 0 && (
                <li className="bg-background p-6 rounded-xl">
                  No content found
                </li>
              )}
            </WebDirectoryScreenshotProvider>
          </ul>
        </div>
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
