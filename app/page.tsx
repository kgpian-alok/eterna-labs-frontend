"use client";
import React, { useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Hooks & State
import { useTokenQuery } from "@/hooks/useTokenQuery";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setSearchQuery,
  setFilterColumn,
  setSort,
  toggleStats,
  setSelectedToken,
} from "@/lib/features/uiSlice";

// Components
import { TokenModal } from "@/components/token-table/TokenModal";
import { TokenRow } from "@/components/token-table/TokenRow";
import { TableHeader } from "@/components/token-table/TableHeader";
import { SkeletonRow } from "@/components/token-table/SkeletonRow";
import { TokenBadge } from "@/components/ui/TokenBadge";

export default function TokenTradingTable() {
  // 1. Data Layer (React Query)
  const { tokens, isLoading } = useTokenQuery();

  // 2. UI State (Redux)
  const dispatch = useAppDispatch();
  const {
    searchQuery,
    filterColumn,
    sortConfig,
    isStatsExpanded,
    selectedToken,
  } = useAppSelector((state) => state.ui);

  // 3. Filtering & Sorting Logic
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
  }, [tokens, searchQuery, filterColumn, sortConfig]);

  // 4. Stats Logic
  const statsByCategory = useMemo(() => {
    const categories = ["New pairs", "Final Stretch", "Migrated"] as const;

    return categories.map((category) => {
      const categoryTokens = tokens.filter((t) => t.column === category);
      return {
        category,
        count: categoryTokens.length,
        marketCap: categoryTokens.reduce((sum, t) => sum + t.marketCap, 0),
        volume: categoryTokens.reduce((sum, t) => sum + t.volume24h, 0),
      };
    });
  }, [tokens]);

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-2xl">
          Token Discovery
        </h1>
        <p className="text-lg text-gray-300">
          Real-time market data and analytics
        </p>
      </div>

      {/* Controls Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["All", "New pairs", "Final Stretch", "Migrated"] as const).map(
            (col) => (
              <button
                type="button"
                key={col}
                onClick={() => dispatch(setFilterColumn(col))}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all backdrop-blur-xl ${
                  filterColumn === col
                    ? "bg-blue-500/30 text-white shadow-lg shadow-blue-500/20 border border-blue-400/30"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {col}
              </button>
            )
          )}
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader
              sortKey={sortConfig.key}
              sortDirection={sortConfig.direction}
              setSort={(key) => dispatch(setSort(key))}
            />
            <tbody className="bg-transparent divide-y divide-white/5">
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : filteredAndSortedTokens.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No tokens found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredAndSortedTokens.map((token) => (
                  <TokenRow
                    key={token.id}
                    token={token}
                    // Previous tokens could be managed in a separate slice or ref if strict diffing is needed
                    previousToken={token}
                    onClick={() => dispatch(setSelectedToken(token))}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 space-y-4">
        {/* Main Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-xl p-4 border border-white/10">
            <div className="text-sm text-gray-400 mb-1">Total Tokens</div>
            <div className="text-2xl font-bold text-white">{tokens.length}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-xl p-4 border border-white/10">
            <div className="text-sm text-gray-400 mb-1">Total Market Cap</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(tokens.reduce((sum, t) => sum + t.marketCap, 0))}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-xl p-4 border border-white/10">
            <div className="text-sm text-gray-400 mb-1">24h Volume</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(tokens.reduce((sum, t) => sum + t.volume24h, 0))}
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          type="button"
          onClick={() => dispatch(toggleStats())}
          className="w-full py-2 flex items-center justify-center space-x-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/10"
        >
          <span>
            {isStatsExpanded ? "Hide Breakdown" : "View Category Breakdown"}
          </span>
          {isStatsExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Detailed Breakdown Section */}
        {isStatsExpanded && (
          <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {statsByCategory.map((stat) => (
              <div
                key={stat.category}
                className="bg-white/5 backdrop-blur-xl rounded-lg p-4 border border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center"
              >
                <div className="flex justify-start">
                  <TokenBadge type={stat.category}>{stat.category}</TokenBadge>
                </div>

                <div className="flex flex-row sm:flex-col justify-between sm:items-center">
                  <span className="text-xs text-gray-500 sm:mb-1">Tokens</span>
                  <span className="text-base font-bold text-white">
                    {stat.count}
                  </span>
                </div>

                <div className="flex flex-row sm:flex-col justify-between sm:items-center">
                  <span className="text-xs text-gray-500 sm:mb-1">
                    Market Cap
                  </span>
                  <span className="text-base font-bold text-white">
                    {formatCurrency(stat.marketCap)}
                  </span>
                </div>

                <div className="flex flex-row sm:flex-col justify-between sm:items-center">
                  <span className="text-xs text-gray-500 sm:mb-1">Volume</span>
                  <span className="text-base font-bold text-white">
                    {formatCurrency(stat.volume)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <TokenModal
        token={selectedToken}
        onClose={() => dispatch(setSelectedToken(null))}
      />
    </div>
  );
}
