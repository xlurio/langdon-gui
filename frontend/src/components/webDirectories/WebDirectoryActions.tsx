import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import WebDirectoryScreenshotContext from "@/contexts/WebDirectoryScreenshotContext";
import { useContext } from "react";

interface WebDirectoryActionsProps {
  webDirectory: {
    id: number;
    screenshot_id: number | null;
  };
}

export default function WebDirectoryActions({
  webDirectory,
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
          disabled={!webDirectory.screenshot_id}
          onClick={() =>
            webDirectoryScreenshotContext.setScreenshotPath(
              `/api/webdirectoriesscreenshots/${webDirectory.screenshot_id}/screenshot.png`
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
          href={`/content?contentId=${webDirectory.id}`}
        >
          <SubdirectoryArrowRightIcon />
        </Button>
      </Tooltip>
    </div>
  );
}
