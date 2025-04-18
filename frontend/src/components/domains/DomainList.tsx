import { Domain } from "@/types/api";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";

interface DomainListProps {
  domains: Domain[];
  hasNextPage?: boolean;
  observerRef?: React.RefObject<HTMLLIElement>;
}

export default function DomainList({
  domains,
  hasNextPage,
  observerRef,
}: DomainListProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2>Domains</h2>
      <ul className="flex flex-col gap-3">
        {domains.map((domain) => (
          <Link key={domain.id} href={`/domains?domainId=${domain.id}`}>
            <li className="bg-background p-6 rounded-xl">{domain.name}</li>
          </Link>
        ))}
        {observerRef && hasNextPage && (
          <Skeleton
            ref={observerRef}
            width={"100%"}
            height={50}
            component="li"
          />
        )}
        {!hasNextPage && domains.length === 0 && (
          <li className="bg-background p-6 rounded-xl">No domain found</li>
        )}
      </ul>
    </div>
  );
}
