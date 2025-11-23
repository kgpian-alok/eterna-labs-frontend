# Token Trading Table - Axiom Trade Replica

A pixel-perfect, high-performance replica of the Axiom Trade token discovery table. This project demonstrates modern frontend architecture using Next.js 14+ (App Router), Redux Toolkit for complex state management, and React Query for real-time data synchronization.

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100-green?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square)

## 📸 Auto-Layout Snapshots

> Responsive layout verified down to 320px width.

| Desktop (1920px) | Tablet (768px) | Mobile (375px) |
| :---: | :---: | :---: |
| *Full data view with sparklines* | *Condensed columns* | *Stackable layout & modals* |

---

## 🏗️ Technical Architecture

This project follows a strict **Atomic Architecture** with **SOLID principles** applied to separate concerns between UI, Logic, and Data.

### 1. State Management Strategy
* **Redux Toolkit (`lib/features/uiSlice.ts`)**: Manages purely client-side UI state that needs to persist or be accessed globally, such as:
    * Sorting configurations (`marketCap` vs `volume`)
    * Filtering logic (Column toggles)
    * Search query strings
    * Modal/Popover visibility states
* **React Query (`hooks/useTokenQuery.ts`)**: Manages server-state and real-time data synchronization.
    * Handles the "Mock WebSocket" updates efficiently by directly updating the query cache (`queryClient.setQueryData`).
    * Ensures UI components only re-render when specific data points change.

### 2. Component Structure
* **Atoms (`components/ui`)**: Highly reusable, stateless primitives (e.g., `TokenBadge`, `Sparkline`, `AnimatedPriceCell`).
* **Molecules (`components/token-table`)**: Domain-specific compositions (e.g., `TokenRow`, `TableHeader`).
* **Organisms (`app/page.tsx`)**: Smart containers that connect Redux/Query hooks to the UI.

### 3. Performance Optimizations
* **`useRef` Animations**: Background particle effects use direct DOM manipulation via `useRef` to avoid React render cycles (60fps performance).
* **Memoization**: Extensive use of `React.memo` for row components and `useMemo` for expensive sorting/filtering operations.
* **Skeleton Loading**: layout-shift-free loading states using `SkeletonRow`.

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+
* npm / yarn / pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/kgpian-alok/token-trading-table.git](https://github.com/kgpian-alok/token-trading-table.git)
    cd token-trading-table
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Testing

### Visual Regression
To verify pixel-perfect alignment with the original design:
1.  Run the visual regression suite (configured via Playwright/Loki):
    ```bash
    npm run test:visual
    ```
2.  Check the diff reports in `tests/visual/diffs`.

*(Note: Ensure your local resolution matches the snapshot configuration)*

### Lighthouse Performance
To verify the >90 Lighthouse score:
1.  Build the production version:
    ```bash
    npm run build && npm start
    ```
2.  Open Chrome DevTools > Lighthouse > Analyze page load.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS 4.0
* **State**: Redux Toolkit + React Redux
* **Data**: TanStack Query v5
* **Icons**: Lucide React
* **Fonts**: Geist Sans / Mono

---

## 📂 Project Structure