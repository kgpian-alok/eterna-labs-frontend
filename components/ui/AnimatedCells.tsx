import React, { useState, useEffect, memo } from "react";
import { formatCurrency } from "@/lib/utils";

export const ChangeCell = memo(
  ({
    value,
    previousChange,
  }: {
    value: number;
    previousChange: number | null;
  }) => {
    const [flashClass, setFlashClass] = useState("");
    const isPositive = value >= 0;

    useEffect(() => {
      if (previousChange !== null && value !== previousChange) {
        const flash =
          value > previousChange ? "bg-green-500/20" : "bg-red-500/20";
        setFlashClass(flash);
        const timer = setTimeout(() => setFlashClass(""), 500);
        return () => clearTimeout(timer);
      }
    }, [value, previousChange]);

    return (
      <div
        className={`transition-all duration-500 rounded px-2 py-1 ${flashClass}`}
      >
        <span
          className={`font-semibold ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {(value * 100).toFixed(2)}%
        </span>
      </div>
    );
  }
);
ChangeCell.displayName = "ChangeCell";

export const PriceCell = memo(
  ({
    price,
    previousPrice,
  }: {
    price: number;
    previousPrice: number | null;
  }) => {
    const [flashClass, setFlashClass] = useState("");

    useEffect(() => {
      if (previousPrice !== null && price !== previousPrice) {
        const flash =
          price > previousPrice ? "bg-green-500/20" : "bg-red-500/20";
        setFlashClass(flash);
        const timer = setTimeout(() => setFlashClass(""), 500);
        return () => clearTimeout(timer);
      }
    }, [price, previousPrice]);

    return (
      <div
        className={`transition-all duration-500 rounded px-2 py-1 ${flashClass}`}
      >
        <span className="font-bold text-white">{formatCurrency(price)}</span>
      </div>
    );
  }
);
PriceCell.displayName = "PriceCell";
