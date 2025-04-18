import { WebDirectory } from "@/types/api";
import WebDirectoryScreenshotProvider from "./WebDirectoryScreenshotProvider";
import { JSX } from "react";
import Skeleton from "@mui/material/Skeleton";

interface WebDirectoryListItemProps {
  webDirectories: WebDirectory[];
  renderItem: (webDirectory: WebDirectory) => JSX.Element;
  hasNextPage?: boolean;
  observerRef?: React.RefObject<HTMLLIElement>;
}

export default function WebDirectoryList({
  webDirectories,
  renderItem,
  hasNextPage,
  observerRef,
}: WebDirectoryListItemProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2>Content</h2>
      <ul className="flex flex-col gap-3">
        <WebDirectoryScreenshotProvider>
          {webDirectories.map((webDirectory) => renderItem(webDirectory))}
          {observerRef && hasNextPage && (
            <Skeleton
              ref={observerRef}
              width={"100%"}
              height={50}
              component="li"
            />
          )}
          {!hasNextPage && webDirectories.length === 0 && (
            <li className="bg-background p-6 rounded-xl">No content found</li>
          )}
        </WebDirectoryScreenshotProvider>
      </ul>
    </div>
  );
}
