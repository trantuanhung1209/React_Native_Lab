import React, { createContext, useContext, useMemo, useState } from "react";

type FavoritesContextValue = {
  ids: string[];
  toggle: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      ids,
      toggle: (id: string) => {
        setIds((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id],
        );
      },
    }),
    [ids],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}
