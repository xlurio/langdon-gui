"use client";
import useWebDirectory from "@/hooks/api/useWebDirectory";
import { Skeleton } from "@mui/material";
import { lazy, Suspense } from "react";
import Card from "../containers/Card";

const WebDirectoryDetailData = lazy(
  () => import("@/components/webDirectories/WebDirectoryDetailData")
);

function LoadingWebDirectoryDetailPage() {
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
        <div className="flex flex-col gap-4 w-full">
          <h2>Headers</h2>
          <ul className="flex flex-col gap-3">
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
            <Skeleton width={"100%"} height={50} component="li" />
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2>Cookies</h2>
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

interface WebDirectoryDetailProps {
  webDirectoryId: number;
}

export default function WebDirectoryDetail({
  webDirectoryId,
}: WebDirectoryDetailProps) {
  const webDirectoryQuery = useWebDirectory({
    id: webDirectoryId,
  });

  return webDirectoryQuery.isLoading ? (
    <LoadingWebDirectoryDetailPage />
  ) : (
    <Suspense fallback={<LoadingWebDirectoryDetailPage />}>
      <WebDirectoryDetailData data={webDirectoryQuery.webDirectory!} />
    </Suspense>
  );
}
