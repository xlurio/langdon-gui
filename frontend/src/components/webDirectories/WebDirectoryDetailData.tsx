import Card from "@/components/containers/Card";
import { getFullUrlFromDirectory } from "@/utils/webDirectories";
import Link from "next/link";
import WebDirectoryActions from "./WebDirectoryActions";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WebDirectoryScreenshotProvider from "./WebDirectoryScreenshotProvider";
import { FullWebDirectoryResponse } from "@/hooks/api/useWebDirectory";

interface WebDirectoryDetailDataProps {
  data: FullWebDirectoryResponse;
}

export default function WebDirectoryDetailData({
  data,
}: WebDirectoryDetailDataProps) {
  return (
    <Card className="flex flex-col gap-12 p-6">
      <div className="flex flex-row justify-between items-center">
        <h1>{getFullUrlFromDirectory({ webDirectory: data })}</h1>
        <div className="flex flex-row justify-end items-center gap-2">
          <Tooltip title="Domain/IP address details">
            <Button
              type="button"
              variant="contained"
              href={
                data.domain
                  ? `/domains?domainId=${data.domain.id}`
                  : `/ports?ipAddressId=${data.ip_address?.id}`
              }
            >
              <HomeOutlinedIcon />
            </Button>
          </Tooltip>
          <WebDirectoryScreenshotProvider>
            <WebDirectoryActions webDirectory={data} />
          </WebDirectoryScreenshotProvider>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <h2>Technologies</h2>
          <ul className="flex flex-col gap-3">
            {data.technologies.map((technology) => (
              <Link
                key={technology.id}
                href={`/technologies?technologyId=${technology.id}`}
              >
                <li className="bg-background p-6 rounded-xl">
                  {technology.name}
                  {technology.version && ` ${technology.version}`}
                </li>
              </Link>
            ))}
            {data.technologies.length === 0 && (
              <li className="bg-background p-6 rounded-xl">
                No technology found
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2>Headers</h2>
          <ul className="flex flex-col gap-3">
            {data.http_headers.map((httpHeader) => (
              <Link
                key={httpHeader.id}
                href={`/headers?httpHeaderId=${httpHeader.id}`}
              >
                <li className="bg-background p-6 rounded-xl">
                  {httpHeader.name}
                </li>
              </Link>
            ))}
            {data.http_headers.length === 0 && (
              <li className="bg-background p-6 rounded-xl">No header found</li>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2>Cookies</h2>
          <ul className="flex flex-col gap-3">
            {data.http_cookies.map((httpCookie) => (
              <Link
                key={httpCookie.id}
                href={`/cookies?httpCookieId=${httpCookie.id}`}
              >
                <li className="bg-background p-6 rounded-xl">
                  {httpCookie.name}
                </li>
              </Link>
            ))}
            {data.http_cookies.length === 0 && (
              <li className="bg-background p-6 rounded-xl">No cookie found</li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}
