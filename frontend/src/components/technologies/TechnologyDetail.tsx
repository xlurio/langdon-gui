"use client";
import useTechnology from "@/hooks/api/useTechnology";
import { Skeleton } from "@mui/material";
import { lazy, Suspense } from "react";
import Card from "../containers/Card";

const TechnologyDetailData = lazy(
  () => import("@/components/technologies/TechnologyDetailData")
);

function LoadingTechnologyDetailPage() {
  return (
    <Card className="flex flex-col gap-12 p-6">
      <div>
        <Skeleton width={"100%"} height={50} />
      </div>
      <div className="flex flex-row gap-4">
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
        <div className="flex flex-col gap-4 w-full">
          <h2>Vulnerabilities</h2>
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

interface TechnologyDetailProps {
  technologyId: number;
}

export default function TechnologyDetail({
  technologyId,
}: TechnologyDetailProps) {
  const technologyQuery = useTechnology({
    id: technologyId,
  });

  return technologyQuery.isLoading ? (
    <LoadingTechnologyDetailPage />
  ) : (
    <Suspense fallback={<LoadingTechnologyDetailPage />}>
      <TechnologyDetailData data={technologyQuery.technology!} />
    </Suspense>
  );
}
