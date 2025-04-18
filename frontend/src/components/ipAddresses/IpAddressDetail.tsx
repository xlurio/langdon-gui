"use client";
import useIpAddress from "@/hooks/api/useIpAddress";
import { Skeleton } from "@mui/material";
import { lazy, Suspense } from "react";
import Card from "../containers/Card";

const IpAddressDetailData = lazy(
  () => import("@/components/ipAddresses/IpAddressDetailData")
);

function LoadingIpAddressDetailPage() {
  return (
    <Card className="flex flex-col gap-12 p-6">
      <div>
        <Skeleton width={"100%"} height={50} />
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <h2>Domains</h2>
          <ul className="flex flex-col gap-3">
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2>Ports</h2>
          <ul className="flex flex-col gap-3">
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2>Content</h2>
          <ul className="flex flex-col gap-3">
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
          </ul>
        </div>
      </div>
    </Card>
  );
}

interface IpAddressDetailProps {
  ipAddressId: number;
}

export default function IpAddressDetail({
  ipAddressId,
}: IpAddressDetailProps) {
  const ipAddressQuery = useIpAddress({
    id: ipAddressId,
  });

  return ipAddressQuery.isLoading ? (
    <LoadingIpAddressDetailPage />
  ) : (
    <Suspense fallback={<LoadingIpAddressDetailPage />}>
      <IpAddressDetailData data={ipAddressQuery.ipAddress!} />
    </Suspense>
  );
}
