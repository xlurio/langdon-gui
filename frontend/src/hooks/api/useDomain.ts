import { useState, useEffect, useContext } from "react";
import { getDomainById, DomainResponse } from "@/adapters/domains";
import { ToastContext } from "@/contexts/toastContext";

interface UseDomainParams {
  id: number;
}

interface UseDomainReturn {
  isLoading: boolean;
  domain: DomainResponse | null;
}

export default function useDomain({
  id,
}: UseDomainParams): UseDomainReturn {
  const [domain, setDomain] = useState<DomainResponse | null>(null);
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    async function fetchDomain() {
      try {
        const data = await getDomainById({ id: id! });
        setDomain(data);
      } catch (error) {
        toastContext.setToastMessage(String(error));
      }
    }
    fetchDomain();
  }, []);

  return {
    isLoading: !domain,
    domain,
  };
}
