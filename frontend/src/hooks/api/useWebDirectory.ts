import { useState, useEffect, useContext } from "react";
import {
  getCookiesByWebDirectoryId,
  getHeadersByWebDirectoryId,
  getTechnologiesByWebDirectoryId,
  getWebDirectoryById,
} from "@/adapters/webDirectories";
import { ToastContext } from "@/contexts/toastContext";
import {
  HttpCookie,
  HttpHeader,
  Technology,
  WebDirectoryWIpNDomain,
} from "@/types/api";

interface UseWebDirectoryParams {
  id: number;
}

interface UseWebDirectoryReturn {
  isLoading: boolean;
  webDirectory: FullWebDirectoryResponse | null;
}

export interface FullWebDirectoryResponse extends WebDirectoryWIpNDomain {
  technologies: Technology[];
  httpHeaders: HttpHeader[];
  httpCookies: HttpCookie[];
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
        const [data, technologies, httpHeaders, httpCookies] = await Promise.all([
          getWebDirectoryById({ id }),
          getTechnologiesByWebDirectoryId({ id }),
          getHeadersByWebDirectoryId({ id }),
          getCookiesByWebDirectoryId({ id }),
        ]);

        const fullData = {
          ...data,
          technologies,
          httpHeaders,
          httpCookies,
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
