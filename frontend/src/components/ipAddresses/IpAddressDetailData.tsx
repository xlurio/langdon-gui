import Card from "@/components/containers/Card";
import Link from "next/link";
import IpAddressActions from "./IpAddressActions";
import { FullIpAddressResponse } from "@/hooks/api/useIpAddress";
import { IpAddress, WebDirectory } from "@/types/api";
import { makeNetlocFromPort } from "@/utils/ipAddresses";
import WebDirectoryListItem from "../webDirectories/WebDirectoryListItem";
import WebDirectoryList from "../webDirectories/WebDirectoryList";
import DomainList from "../domains/DomainList";
import useDomainsByIpAddress from "@/hooks/api/useDomainsByIpAddress";
import { RefObject } from "react";
import useWebDirectoriesByIpAddress from "@/hooks/api/useWebDirectoriesByIpAddress";

interface GetFullUrlFromDirectoryNDomainParams {
  ipAddress: IpAddress;
  webDirectory: WebDirectory;
}

function getFullUrlFromDirectoryNDomain({
  ipAddress,
  webDirectory,
}: GetFullUrlFromDirectoryNDomainParams) {
  const schema = webDirectory.uses_ssl ? "https" : "http";
  const netloc = makeNetlocFromPort({
    port: { port: webDirectory.uses_ssl ? 443 : 80, ip_address: ipAddress },
  });
  const path = webDirectory.path.startsWith("/")
    ? webDirectory.path.slice(1)
    : webDirectory.path;

  return `${schema}://${netloc}/${path}`;
}

interface IpAddressDetailDataProps {
  data: FullIpAddressResponse;
}

export default function IpAddressDetailData({
  data,
}: IpAddressDetailDataProps) {
  const domainsQuery = useDomainsByIpAddress({
    ipAddressId: data.id,
  });
  const webDirectoriesQuery = useWebDirectoriesByIpAddress({
    ipAddressId: data.id,
  });

  return (
    <Card className="flex flex-col gap-12 p-6">
      <div className="flex flex-row justify-between items-center">
        <h1>{data.address}</h1>
        <IpAddressActions ipAddress={data} />
      </div>
      <div className="flex flex-row gap-4">
        <DomainList
          domains={domainsQuery.domains}
          hasNextPage={domainsQuery.hasNextPage}
          observerRef={domainsQuery.observedElementRef as RefObject<HTMLLIElement>}
        />
        <div className="flex flex-col gap-4 w-full">
          <h2>Ports</h2>
          <ul className="flex flex-col gap-3">
            {data.usedPorts.map((usedPort) => (
              <Link key={usedPort.id} href={`/ports?portId=${usedPort.id}`}>
                <li className="bg-background p-6 rounded-xl">
                  {usedPort.port}
                </li>
              </Link>
            ))}
            {data.usedPorts.length === 0 && (
              <li className="bg-background p-6 rounded-xl">No port found</li>
            )}
          </ul>
        </div>
        <WebDirectoryList
          webDirectories={webDirectoriesQuery.webDirectories}
          hasNextPage={webDirectoriesQuery.hasNextPage}
          observerRef={
            webDirectoriesQuery.observedElementRef as RefObject<HTMLLIElement>
          }
          renderItem={(webDirectory) => (
            <WebDirectoryListItem
              key={webDirectory.id}
              url={getFullUrlFromDirectoryNDomain({
                ipAddress: data,
                webDirectory: webDirectory,
              })}
              webDirectory={webDirectory}
            />
          )}
        />
      </div>
    </Card>
  );
}
