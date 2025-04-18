import { useState, useEffect, useContext } from "react";
import {
  getCookiesByWebDirectoryId,
  getHeadersByWebDirectoryId,
  getTechnologiesByWebDirectoryId,
  getWebDirectoryById,
} from "@/adapters/webDirectories";
import { ToastContext } from "@/contexts/toastContext";
import {
  Domain,
  HttpCookie,
  HttpHeader,
  IpAddress,
  Technology,
} from "@/types/api";

interface UseWebDirectoryParams {
  id: number;
}

interface UseWebDirectoryReturn {
  isLoading: boolean;
  webDirectory: FullWebDirectoryResponse | null;
}

export interface FullWebDirectoryResponse {
  id: number;
  path: string;
  uses_ssl: boolean;
  domain: Domain | null;
  ip_address: IpAddress | null;
  technologies: Technology[];
  http_headers: HttpHeader[];
  http_cookies: HttpCookie[];
  screenshot_id: number | null;
}

export default function useWebDirectory({
  id,
}: UseWebDirectoryParams): UseWebDirectoryReturn {
  const [webDirectory, setWebDirectory] =
    useState<FullWebDirectoryResponse | null>(null);
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    async function fetchWebDirectory() {
      try {
        const [data, technologies, http_headers, http_cookies] = await Promise.all([
          getWebDirectoryById({ id }),
          getTechnologiesByWebDirectoryId({ id }),
          getHeadersByWebDirectoryId({ id }),
          getCookiesByWebDirectoryId({ id }),
        ]);

        const fullData = {
          ...data,
          technologies,
          http_headers,
          http_cookies,
        };

        setWebDirectory(fullData);
      } catch (error) {
        toastContext.setToastMessage(String(error));
      }
    }
    fetchWebDirectory();
  }, []);

  return {
    isLoading: !webDirectory,
    webDirectory,
  };
}
