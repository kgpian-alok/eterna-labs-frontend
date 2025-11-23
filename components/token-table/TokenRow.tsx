import React, { memo } from "react";
import { Token } from "@/types";
import { formatCurrency, generateSparklinePath } from "@/lib/utils";
import { TokenBadge } from "@/components/ui/TokenBadge";
import { Sparkline } from "@/components/ui/Sparkline";
import { ChangeCell, PriceCell } from "@/components/ui/AnimatedCells";
import { Tooltip } from "@/components/ui/Tooltip";
import { Info, X } from "lucide-react";
import { formatNumber } from "@/lib/utils";

// Popover is small enough to stay co-located or move to ui folder
const Popover = ({ token }: { token: Token }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Show token details"
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
        className="p-1 hover:bg-white/10 rounded transition-colors"
      >
        <Info className="w-4 h-4 text-gray-400 hover:text-gray-200" />
      </button>
      {show && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShow(false)} />
          <div className="absolute z-50 w-64 p-4 bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-xl border border-white/10 -right-2 top-8">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white">Token Details</h3>
                <button
                  type="button"
                  aria-label="Show token details"
                  onClick={() => setShow(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Liquidity:</span>
                  <span className="font-medium text-white">
                    {formatCurrency(token.liquidity)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Holders:</span>
                  <span className="font-medium text-white">
                    {formatNumber(token.holders)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const TokenRow = memo(
  ({
    token,
    previousToken,
    onClick,
  }: {
    token: Token;
    previousToken: Token | null;
    onClick: () => void;
  }) => {
    const sparklinePath = generateSparklinePath(token.history);
    const sparklineColor = token.change24h >= 0 ? "green" : "red";
    const prevPrice = previousToken?.price ?? token.price;
    const prevChange = previousToken?.change24h ?? token.change24h;

    return (
      <tr
        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
        onClick={onClick}
      >
        <td className="py-4 px-4 lg:px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              {token.symbol[0]}
            </div>
            <div>
              <div className="font-semibold text-white">{token.name}</div>
              <div className="text-sm text-gray-400">{token.symbol}</div>
            </div>
          </div>
        </td>

        <td className="py-4 px-4 lg:px-6 hidden md:table-cell">
          <TokenBadge type={token.column}>{token.column}</TokenBadge>
        </td>

        <td className="py-4 px-4 lg:px-6 text-gray-300 font-medium hidden lg:table-cell">
          {formatCurrency(token.marketCap)}
        </td>

        <td className="py-4 px-4 lg:px-6 text-gray-300 hidden xl:table-cell">
          {formatCurrency(token.volume24h)}
        </td>

        <td className="py-4 px-4 lg:px-6 hidden sm:table-cell">
          <Sparkline path={sparklinePath} color={sparklineColor} />
        </td>

        <td className="py-4 px-4 lg:px-6">
          <ChangeCell value={token.change24h} previousChange={prevChange} />
        </td>

        <td className="py-4 px-4 lg:px-6">
          <PriceCell price={token.price} previousPrice={prevPrice} />
        </td>

        <td className="py-4 px-4 lg:px-6">
          <div className="flex items-center space-x-2">
            <Tooltip content="More information">
              <Popover token={token} />
            </Tooltip>
          </div>
        </td>
      </tr>
    );
  }
);
TokenRow.displayName = "TokenRow";
