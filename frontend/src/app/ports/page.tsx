"use client";
import { lazy, Suspense, useEffect, useState } from "react";

const UsedPortDetail = lazy(
  () => import("@/components/usedPorts/UsedPortDetail")
);

export default function UsedPortDetailPage() {
  const [isDetailPage, setIsDetailPage] = useState<boolean | null>(null);
  const [usedPortId, setUsedPortId] = useState<number | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const usedPortId = urlParams.get("portId");

    if (usedPortId) {
      setUsedPortId(Number.parseInt(usedPortId));
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
  }, []);

  return (
    isDetailPage && (
      <Suspense>
        <UsedPortDetail usedPortId={usedPortId!} />
      </Suspense>
    )
  );
}
