import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import WebDirectoryScreenshotContext from "@/contexts/WebDirectoryScreenshotContext";
import { useContext } from "react";

interface WebDirectoryActionsProps {
  webDirectoryId: number;
  screenshotPath: string | null;
}

export default function WebDirectoryActions({
  webDirectoryId,
  screenshotPath,
}: WebDirectoryActionsProps) {
  const webDirectoryScreenshotContext = useContext(
    WebDirectoryScreenshotContext
  );

  return (
    <div className="flex flex-row gap-2 justify-end">
      <Tooltip title="View screenshot">
        <Button
          type="button"
          variant="contained"
          disabled={!screenshotPath}
          onClick={() =>
            webDirectoryScreenshotContext.setScreenshotPath(
              `/api/webdirectories/${webDirectoryId}/screenshot.png`
            )
          }
        >
          <VisibilityOutlinedIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Content details">
        <Button
          variant="contained"
          type="button"
          href={`/content?contentId=${webDirectoryId}`}
        >
          <SubdirectoryArrowRightIcon />
        </Button>
      </Tooltip>
    </div>
  );
}
