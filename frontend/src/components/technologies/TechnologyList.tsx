import { Technology } from "@/types/api";
import Link from "next/link";

export default function TechnologyList({
  technologies,
}: {
  technologies: Technology[];
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2>Technologies</h2>
      <ul className="flex flex-col gap-3">
        {technologies.map((technology) => (
          <Link
            key={technology.id}
            href={`/technologies?technologyId=${technology.id}`}
          >
            <li className="bg-background p-6 rounded-xl">
              {technology.name}
              {technology.version && ` ${technology.version}`}
            </li>
          </Link>
        ))}
        {technologies.length === 0 && (
          <li className="bg-background p-6 rounded-xl">No technology found</li>
        )}
      </ul>
    </div>
  );
}
