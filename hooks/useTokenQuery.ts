import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MOCK_TOKENS } from "@/constants/mockData";
import { Token } from "@/types";

// This function simulates the initial fetch
const fetchTokens = async (): Promise<Token[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCK_TOKENS;
};

export const useTokenQuery = () => {
  const queryClient = useQueryClient();

  // 1. Use React Query for the data source
  const { data: tokens = [], isLoading } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    // Set initial data to avoid hard loading states if preferred, 
    // or leave generic to show skeleton
    staleTime: Infinity, // We manage updates manually via socket
  });

  // 2. Setup the Mock WebSocket to update the Query Cache
  useEffect(() => {
    if (isLoading) return;

    const intervalId = setInterval(() => {
      queryClient.setQueryData(["tokens"], (oldTokens: Token[] | undefined) => {
        if (!oldTokens) return [];
        
        return oldTokens.map((token) => {
          // Simulate price movement
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
  }, [queryClient, isLoading]);

  return { tokens, isLoading };
};