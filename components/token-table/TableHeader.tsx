import React, { memo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { SortKey, SortDirection } from "@/types";

interface TableHeaderProps {
  sortKey: SortKey | null;
  sortDirection: SortDirection;
  setSort: (key: SortKey) => void;
}

export const TableHeader = memo(
  ({ sortKey, sortDirection, setSort }: TableHeaderProps) => {
    const headers = [
      { key: "name" as const, label: "Token", sortable: false },
      {
        key: "column" as const,
        label: "Status",
        sortable: false,
        className: "hidden md:table-cell",
      },
      {
        key: "marketCap" as const,
        label: "Market Cap",
        sortable: true,
        className: "hidden lg:table-cell",
      },
      {
        key: "volume24h" as const,
        label: "Volume (24h)",
        sortable: true,
        className: "hidden xl:table-cell",
      },
      {
        key: "history" as const,
        label: "Chart (7d)",
        sortable: false,
        className: "hidden sm:table-cell",
      },
      { key: "change24h" as const, label: "Change (24h)", sortable: true },
      { key: "price" as const, label: "Price", sortable: true },
      { key: "actions" as const, label: "Info", sortable: false },
    ];

    return (
      <thead>
        <tr className="bg-white/5 border-b border-white/10">
          {headers.map((header) => (
            <th
              key={header.key}
              onClick={() => header.sortable && setSort(header.key as SortKey)}
              className={`py-3 px-4 lg:px-6 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider ${
                header.sortable ? "cursor-pointer hover:bg-white/10" : ""
              } ${header.className || ""}`}
            >
              <div className="flex items-center space-x-1">
                <span>{header.label}</span>
                {header.sortable &&
                  sortKey === header.key &&
                  (sortDirection === "ascending" ? (
                    <ChevronUp className="w-4 h-4 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-blue-400" />
                  ))}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
);
TableHeader.displayName = "TableHeader";
