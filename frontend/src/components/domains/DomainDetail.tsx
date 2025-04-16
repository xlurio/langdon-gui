"use client";
import useDomain from "@/hooks/api/useDomain";
import { Skeleton } from "@mui/material";
import { lazy, Suspense } from "react";
import Card from "../containers/Card";

const DomainDetailData = lazy(
  () => import("@/components/domains/DomainDetailData")
);

function LoadingDomainDetailPage() {
  return (
    <Card className="flex flex-col gap-12 p-6">
      <div>
        <Skeleton width={"100%"} height={50} />
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <h2>Content</h2>
          <ul className="flex flex-col gap-3">
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2>IP Addresses</h2>
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

interface DomainDetailProps {
  domainId: number;
}

export default function DomainDetail({
  domainId,
}: DomainDetailProps) {
  const domainQuery = useDomain({
    id: domainId,
  });

  return domainQuery.isLoading ? (
    <LoadingDomainDetailPage />
  ) : (
    <Suspense fallback={<LoadingDomainDetailPage />}>
      <DomainDetailData data={domainQuery.domain!} />
    </Suspense>
  );
}
