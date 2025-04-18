import { useState, useEffect, useContext } from "react";
import { getUsedPortById, UsedPortResponse } from "@/adapters/usedPorts";
import { ToastContext } from "@/contexts/toastContext";

interface UseUsedPortParams {
  id: number;
}

interface UseUsedPortReturn {
  isLoading: boolean;
  usedPort: UsedPortResponse | null;
}

export default function useUsedPort({
  id,
}: UseUsedPortParams): UseUsedPortReturn {
  const [usedPort, setUsedPort] = useState<UsedPortResponse | null>(null);
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    async function fetchUsedPort() {
      try {
        const data = await getUsedPortById({ id: id! });
        setUsedPort(data);
      } catch (error) {
        toastContext.setToastMessage(String(error));
      }
    }
    fetchUsedPort();
  }, []);

  return {
    isLoading: !usedPort,
    usedPort,
  };
}
