"use client";
import { lazy, Suspense, useEffect, useState } from "react";

const WebDirectoryDetail = lazy(
  () => import("@/components/webDirectories/WebDirectoryDetail")
);

export default function WebDirectoryDetailPage() {
  const [isDetailPage, setIsDetailPage] = useState<boolean | null>(null);
  const [webDirectoryId, setWebDirectoryId] = useState<number | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const webDirectoryId = urlParams.get("contentId");

    if (webDirectoryId) {
      setWebDirectoryId(Number.parseInt(webDirectoryId));
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
  }, []);

  return (
    isDetailPage && (
      <Suspense>
        <WebDirectoryDetail webDirectoryId={webDirectoryId!} />
      </Suspense>
    )
  );
}
