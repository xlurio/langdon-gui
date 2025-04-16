"use client";
import { lazy, Suspense, useEffect, useState } from "react";

const DomainDetail = lazy(
  () => import("@/components/domains/DomainDetail")
);

export default function DomainDetailPage() {
  const [isDetailPage, setIsDetailPage] = useState<boolean | null>(null);
  const [domainId, setDomainId] = useState<number | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const domainId = urlParams.get("domainId");

    if (domainId) {
      setDomainId(Number.parseInt(domainId));
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
  }, []);

  return (
    isDetailPage && (
      <Suspense>
        <DomainDetail domainId={domainId!} />
      </Suspense>
    )
  );
}
