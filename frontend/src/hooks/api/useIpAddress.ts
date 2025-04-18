import { useState, useEffect, useContext } from "react";
import {
  getIpAddressById,
  getPortsByIpAddressId,
} from "@/adapters/ipAddresses";
import { ToastContext } from "@/contexts/toastContext";
import { IpAddress, UsedPort } from "@/types/api";

interface UseIpAddressParams {
  id: number;
}

interface UseIpAddressReturn {
  isLoading: boolean;
  ipAddress: FullIpAddressResponse | null;
}

export interface FullIpAddressResponse extends IpAddress {
  usedPorts: UsedPort[];
}

export default function useIpAddress({
  id,
}: UseIpAddressParams): UseIpAddressReturn {
  const [ipAddress, setIpAddress] = useState<FullIpAddressResponse | null>(
    null
  );
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    async function fetchIpAddress() {
      try {
        const [data, usedPorts] = await Promise.all([
          getIpAddressById({ id }),
          getPortsByIpAddressId({ id }),
        ]);

        const fullData = {
          ...data,
          usedPorts,
        };

        setIpAddress(fullData);
      } catch (error) {
        toastContext.setToastMessage(String(error));
      }
    }
    fetchIpAddress();
  }, []);

  return {
    isLoading: !ipAddress,
    ipAddress,
  };
}
