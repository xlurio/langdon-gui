import { TechnologyResponse } from "@/adapters/technologies";
import Card from "@/components/containers/Card";
import { getFullUrlFromDirectory } from "@/utils/webDirectories";
import Link from "next/link";
import WebDirectoryActions from "../webDirectories/WebDirectoryActions";
import WebDirectoryScreenshotProvider from "../webDirectories/WebDirectoryScreenshotProvider";

interface TechnologyDetailDataProps {
  data: TechnologyResponse;
}

export default function TechnologyDetailData({
  data,
}: TechnologyDetailDataProps) {
  return (
    <Card className="flex flex-col gap-12 p-6">
      <div>
        <h1>{data.name}</h1>
        <p className="text-text/50 text-sm">Version: {data.version}</p>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <h2>Ports</h2>
          <ul className="flex flex-col gap-3">
            {data.used_ports.map((used_port) => (
              <Link key={used_port.id} href={`/ports?portId=${used_port.id}`}>
                <li className="bg-background p-6 rounded-xl">
                  {used_port.ip_address.address}:{used_port.port}
                </li>
              </Link>
            ))}
            {data.used_ports.length === 0 && (
              <li className="bg-background p-6 rounded-xl">No ports found</li>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2>Content</h2>
          <ul className="flex flex-col gap-3">
            <WebDirectoryScreenshotProvider>
              {data.web_directories.map((webDirectory) => (
                <li
                  key={webDirectory.id}
                  className="bg-background p-6 rounded-xl"
                >
                  {getFullUrlFromDirectory({ webDirectory })}
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
          <h2>Vulnerabilities</h2>
          <ul className="flex flex-col gap-3">
            {data.vulnerabilities.map((vulnerability) => (
              <Link
                key={vulnerability.id}
                href={`/vulnerabilities?vulnerabilityId=${vulnerability.id}`}
              >
                <li className="bg-background p-6 rounded-xl">
                  {vulnerability.name}
                </li>
              </Link>
            ))}
            {data.vulnerabilities.length === 0 && (
              <li className="bg-background p-6 rounded-xl">
                No vulnerabilities found
              </li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}
