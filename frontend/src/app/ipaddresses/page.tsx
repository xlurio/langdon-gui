"use client";
import { lazy, Suspense, useEffect, useState } from "react";

const IpAddressDetail = lazy(
  () => import("@/components/ipAddresses/IpAddressDetail")
);

export default function IpAddressDetailPage() {
  const [isDetailPage, setIsDetailPage] = useState<boolean | null>(null);
  const [ipAddressId, setIpAddressId] = useState<number | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ipAddressId = urlParams.get("ipAddressId");

    if (ipAddressId) {
      setIpAddressId(Number.parseInt(ipAddressId));
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
  }, []);

  return (
    isDetailPage && (
      <Suspense>
        <IpAddressDetail ipAddressId={ipAddressId!} />
      </Suspense>
    )
  );
}
