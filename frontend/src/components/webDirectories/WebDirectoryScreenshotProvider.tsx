import WebDirectoryScreenshotContext from "@/contexts/WebDirectoryScreenshotContext";
import Modal from "@mui/material/Modal";
import Card from "../containers/Card";
import { useState } from "react";

export default function WebDirectoryScreenshotProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screenshotPath, setScreenshotPath] = useState<string | null>(null);

  const handleClose = () => {
    setScreenshotPath(null);
  };

  return (
    <WebDirectoryScreenshotContext.Provider value={{ setScreenshotPath }}>
      {children}
      <Modal
        open={!!screenshotPath}
        className="flex flex-col items-center p-12"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className="flex flex-col items-center p-6 h-full w-full overflow-y-scroll">
          <img src={screenshotPath!} alt="Content screenshot" />
        </Card>
      </Modal>
    </WebDirectoryScreenshotContext.Provider>
  );
}
