"use client";
import { useState, useEffect, useContext, useRef, RefObject } from "react";
import { ToastContext } from "@/contexts/toastContext";
import { Domain } from "@/types/api";
import { getDomainsByIpAddressId } from "@/adapters/ipAddresses";

interface UseDomainsByIpAddressReturn {
  domains: Domain[];
  hasNextPage: boolean;
  observedElementRef: RefObject<HTMLElement | null>;
}

export default function useDomainsByIpAddress({
  ipAddressId,
}: {
  ipAddressId: number;
}): UseDomainsByIpAddressReturn {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [page, setPage] = useState<number | null>(0);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const toastContext = useContext(ToastContext);
  const observedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    async function fetchOverview() {
      try {
        const data = await getDomainsByIpAddressId({
          id: ipAddressId,
          page: page!,
        });
        setDomains((prevState) => [...prevState, ...data.results]);
        setNextPage(data.next);
      } catch (error) {
        toastContext.setToastMessage(String(error));
      }
    }

    if (page !== null) {
      fetchOverview();
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage(nextPage);
        }
      },
      { threshold: 1 }
    );

    const currentElement = observedElementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [observedElementRef, nextPage]);

  return {
    domains,
    hasNextPage: nextPage !== null,
    observedElementRef,
  };
}
