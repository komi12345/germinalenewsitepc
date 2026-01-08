"use client";

import Link from "next/link";
import { cn } from "../../lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Composant Breadcrumb (fil d'Ariane)
 * Affiche la navigation hiérarchique avec séparateur "/"
 * Requirements: 2.1, 2.2, 8.3
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-sm", className)}>
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-light-dimmed hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(
                  isLast ? "text-light font-medium" : "text-light-dimmed"
                )}>
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="text-light-dimmed" aria-hidden="true">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
