import { useState, useEffect } from "react";
import { Token } from "@/types";
import { MOCK_TOKENS } from "@/constants/mockData";

export const useTokenSocket = () => {
  const [tokens, setTokens] = useState<Token[]>(MOCK_TOKENS);
  const [previousTokens, setPreviousTokens] = useState<Token[]>(MOCK_TOKENS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const intervalId = setInterval(() => {
      setTokens((prevTokens) => {
        setPreviousTokens(prevTokens);
        return prevTokens.map((token) => {
          const priceChange = (Math.random() * 0.04 - 0.02) * token.price;
          const newPrice = Math.max(0.0001, token.price + priceChange);
          const newChange24h = Math.random() * 0.4 - 0.2;
          const newHistory = [...token.history.slice(1), newPrice];

          return {
            ...token,
            price: newPrice,
            change24h: newChange24h,
            history: newHistory,
          };
        });
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isLoading]);

  return { tokens, previousTokens, isLoading };
};