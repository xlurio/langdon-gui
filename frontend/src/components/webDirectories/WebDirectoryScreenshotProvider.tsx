import WebDirectoryScreenshotContext from "@/contexts/WebDirectoryScreenshotContext";
import Modal from "@mui/material/Modal";
import Card from "../containers/Card";
import Image from "next/image";
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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className="flex flex-col items-center p-6">
          <Image src={screenshotPath!} alt="Content screenshot" />
        </Card>
      </Modal>
    </WebDirectoryScreenshotContext.Provider>
  );
}
