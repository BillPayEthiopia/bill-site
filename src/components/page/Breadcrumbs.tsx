import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/** "Home › About" trail. The last item is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="text-navy/60 transition-colors duration-200 hover:text-navy">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="font-medium text-navy">
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5 text-navy/30" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}