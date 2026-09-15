import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { loadSolvedIds, persistSolvedIds } from "../storage/progress";

interface SolvedContextValue {
  solvedIds: Set<number>;
  markSolved: (id: number) => void;
}

const SolvedContext = createContext<SolvedContextValue | null>(null);

export function SolvedProvider({ children }: { children: ReactNode }) {
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadSolvedIds().then(setSolvedIds);
  }, []);

  const markSolved = useCallback((id: number) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      persistSolvedIds(next);
      return next;
    });
  }, []);

  return <SolvedContext.Provider value={{ solvedIds, markSolved }}>{children}</SolvedContext.Provider>;
}

export function useSolved() {
  const ctx = useContext(SolvedContext);
  if (!ctx) throw new Error("useSolved must be used within a SolvedProvider");
  return ctx;
}
