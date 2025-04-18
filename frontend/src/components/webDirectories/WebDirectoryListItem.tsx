import { WebDirectory } from "@/types/api";
import WebDirectoryActions from "./WebDirectoryActions";

interface WebDirectoryListItemProps {
  webDirectory: WebDirectory;
  url: string;
}

export default function WebDirectoryListItem({
  webDirectory,
  url,
}: WebDirectoryListItemProps) {
  return (
    <li className="bg-background p-6 rounded-xl flex flex-row justify-between items-center">
      {url}
      <WebDirectoryActions webDirectory={webDirectory} />
    </li>
  );
}
