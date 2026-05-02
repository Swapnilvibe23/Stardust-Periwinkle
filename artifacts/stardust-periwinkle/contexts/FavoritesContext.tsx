import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface FavoriteItem {
  id: string;
  type: "calm" | "activity" | "story" | "routine" | "breathe";
  title: string;
  content: Record<string, string>;
  savedAt: number;
  childName?: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, "id" | "savedAt">) => void;
  removeFavorite: (id: string) => void;
  isFavorited: (title: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
const STORAGE_KEY = "@stardust_favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((str) => {
      if (str) setFavorites(JSON.parse(str));
    });
  }, []);

  async function save(updated: FavoriteItem[]) {
    setFavorites(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function addFavorite(item: Omit<FavoriteItem, "id" | "savedAt">) {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    save([{ id, savedAt: Date.now(), ...item }, ...favorites]);
  }

  function removeFavorite(id: string) {
    save(favorites.filter((f) => f.id !== id));
  }

  function isFavorited(title: string) {
    return favorites.some((f) => f.title === title);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
