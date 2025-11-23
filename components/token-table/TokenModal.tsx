import React from "react";
import { X, LucideExternalLink } from "lucide-react";
import { Token } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { TokenBadge } from "@/components/ui/TokenBadge";

export const TokenModal = ({
  token,
  onClose,
}: {
  token: Token | null;
  onClose: () => void;
}) => {
  if (!token) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                {token.symbol[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{token.name}</h2>
                <p className="text-gray-400">{token.symbol}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Show token details"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Price</div>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(token.price)}
              </div>
              <div
                className={`text-sm font-semibold mt-1 ${
                  token.change24h >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {token.change24h >= 0 ? "+" : ""}
                {(token.change24h * 100).toFixed(2)}% (24h)
              </div>
            </div>
            <div className="p-4 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Market Cap</div>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(token.marketCap)}
              </div>
            </div>
          </div>

          {/* Detailed List */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Volume (24h):</span>
                <span className="font-semibold text-white">
                  {formatCurrency(token.volume24h)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Liquidity:</span>
                <span className="font-semibold text-white">
                  {formatCurrency(token.liquidity)}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Transactions:</span>
                <span className="font-semibold text-white">
                  {formatNumber(token.transactions24h)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <TokenBadge type={token.column}>{token.column}</TokenBadge>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2"
          >
            <span>View more</span>
            <LucideExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
