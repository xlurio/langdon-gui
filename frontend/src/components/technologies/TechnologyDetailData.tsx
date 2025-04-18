import { TechnologyResponse } from "@/adapters/technologies";
import Card from "@/components/containers/Card";
import { getFullUrlFromDirectory } from "@/utils/webDirectories";
import Link from "next/link";
import { makeNetlocFromPort } from "@/utils/ipAddresses";
import WebDirectoryList from "../webDirectories/WebDirectoryList";
import WebDirectoryListItem from "../webDirectories/WebDirectoryListItem";
import { WebDirectoryWIpNDomain } from "@/types/api";

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
                  {makeNetlocFromPort({ port: used_port })}
                </li>
              </Link>
            ))}
            {data.used_ports.length === 0 && (
              <li className="bg-background p-6 rounded-xl">No ports found</li>
            )}
          </ul>
        </div>
        <WebDirectoryList
          webDirectories={data.web_directories}
          renderItem={(webDirectory) => (
            <WebDirectoryListItem
              key={webDirectory.id}
              url={getFullUrlFromDirectory({
                webDirectory: webDirectory as WebDirectoryWIpNDomain,
              })}
              webDirectory={webDirectory}
            />
          )}
        />
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
