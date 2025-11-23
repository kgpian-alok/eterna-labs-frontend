import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortKey, SortDirection, TokenColumn, Token } from "@/types";

interface UiState {
  searchQuery: string;
  filterColumn: TokenColumn | "All";
  sortConfig: {
    key: SortKey | null;
    direction: SortDirection;
  };
  isStatsExpanded: boolean;
  selectedToken: Token | null;
}

const initialState: UiState = {
  searchQuery: "",
  filterColumn: "All",
  sortConfig: {
    key: "marketCap",
    direction: "descending",
  },
  isStatsExpanded: false,
  selectedToken: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterColumn: (state, action: PayloadAction<TokenColumn | "All">) => {
      state.filterColumn = action.payload;
    },
    setSort: (state, action: PayloadAction<SortKey>) => {
      const key = action.payload;
      if (state.sortConfig.key === key && state.sortConfig.direction === "descending") {
        state.sortConfig.direction = "ascending";
      } else {
        state.sortConfig.key = key;
        state.sortConfig.direction = "descending";
      }
    },
    toggleStats: (state) => {
      state.isStatsExpanded = !state.isStatsExpanded;
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setFilterColumn,
  setSort,
  toggleStats,
  setSelectedToken,
} = uiSlice.actions;

export default uiSlice.reducer;