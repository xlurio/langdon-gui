"use client";
import useUsedPort from "@/hooks/api/useUsedPort";
import { Skeleton } from "@mui/material";
import { lazy, Suspense } from "react";
import Card from "../containers/Card";

const UsedPortDetailData = lazy(
  () => import("@/components/usedPorts/UsedPortDetailData")
);

function LoadingUsedPortDetailPage() {
  return (
    <Card className="flex flex-col gap-12 p-6">
      <div>
        <Skeleton width={"100%"} height={50} />
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <h2>Technologies</h2>
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

interface UsedPortDetailProps {
  usedPortId: number;
}

export default function UsedPortDetail({
  usedPortId,
}: UsedPortDetailProps) {
  const usedPortQuery = useUsedPort({
    id: usedPortId,
  });

  return usedPortQuery.isLoading ? (
    <LoadingUsedPortDetailPage />
  ) : (
    <Suspense fallback={<LoadingUsedPortDetailPage />}>
      <UsedPortDetailData data={usedPortQuery.usedPort!} />
    </Suspense>
  );
}
