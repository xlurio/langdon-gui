"use client";
import { createContext, Dispatch, SetStateAction } from "react";

interface WebDirectoryScreenshotContext {
  setScreenshotPath: Dispatch<SetStateAction<string | null>>;
}

export default createContext<WebDirectoryScreenshotContext>({
  setScreenshotPath: () => {},
});
