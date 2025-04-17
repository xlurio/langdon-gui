import { DomainResponse } from "@/adapters/domains";
import Card from "@/components/containers/Card";
import { WebDirectory } from "@/types/api";
import WebDirectoryScreenshotProvider from "../webDirectories/WebDirectoryScreenshotProvider";
import WebDirectoryActions from "../webDirectories/WebDirectoryActions";
import IpAddressActions from "../ipAddresses/IpAddressActions";

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
            <WebDirectoryScreenshotProvider>
              {data.web_directories.map((web_directory) => (
                <li
                  key={web_directory.id}
                  className="bg-background p-6 rounded-xl flex flex-row justify-between items-center"
                >
                  {getFullUrlFromDirectoryNDomain({
                    domain: data,
                    web_directory,
                  })}
                  <WebDirectoryActions
                    webDirectoryId={web_directory.id}
                    screenshotPath={web_directory.screenshot}
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
