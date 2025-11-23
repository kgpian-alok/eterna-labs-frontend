import { useMemo, useState, useCallback } from "react";
import { Token, SortKey, SortDirection, TokenColumn } from "@/types";

export const useTokenFilter = (tokens: Token[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterColumn, setFilterColumn] = useState<TokenColumn | "All">("All");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey | null;
    direction: SortDirection;
  }>({
    key: "marketCap",
    direction: "descending",
  });

  const setSort = useCallback((key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "descending"
          ? "ascending"
          : "descending",
    }));
  }, []);

  const filteredAndSortedTokens = useMemo(() => {
    let result = [...tokens];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (token) =>
          token.name.toLowerCase().includes(lowerQuery) ||
          token.symbol.toLowerCase().includes(lowerQuery)
      );
    }

    if (filterColumn !== "All") {
      result = result.filter((token) => token.column === filterColumn);
    }

    const { key, direction } = sortConfig;
    if (key && direction) {
      result.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        if (aValue < bValue) return direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [tokens, sortConfig, searchQuery, filterColumn]);

  return {
    searchQuery,
    setSearchQuery,
    filterColumn,
    setFilterColumn,
    sortConfig,
    setSort,
    filteredAndSortedTokens,
  };
};