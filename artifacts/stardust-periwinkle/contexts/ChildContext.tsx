import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type AgeRange = "1-2" | "3-4" | "5-6" | "7-8";

export interface ChildProfile {
  id: string;
  name: string;
  ageRange: AgeRange;
  favoriteThemes: string[];
  commonStruggles: string[];
}

interface ChildContextType {
  children: ChildProfile[];
  activeChild: ChildProfile | null;
  setActiveChild: (id: string) => void;
  addChild: (child: Omit<ChildProfile, "id">) => void;
  updateChild: (id: string, updates: Partial<Omit<ChildProfile, "id">>) => void;
  removeChild: (id: string) => void;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

const STORAGE_KEY = "@stardust_children";
const ACTIVE_KEY = "@stardust_active_child";

export function ChildProvider({ children: childrenProp }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [profilesStr, activeStr] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(ACTIVE_KEY),
      ]);
      if (profilesStr) setProfiles(JSON.parse(profilesStr));
      if (activeStr) setActiveId(activeStr);
    } catch (_) {}
  }

  async function saveProfiles(updated: ChildProfile[]) {
    setProfiles(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function setActiveChild(id: string) {
    setActiveId(id);
    AsyncStorage.setItem(ACTIVE_KEY, id);
  }

  function addChild(child: Omit<ChildProfile, "id">) {
    if (profiles.length >= 3) return;
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newProfile: ChildProfile = { id, ...child };
    const updated = [...profiles, newProfile];
    saveProfiles(updated);
    if (!activeId) setActiveChild(id);
  }

  function updateChild(id: string, updates: Partial<Omit<ChildProfile, "id">>) {
    const updated = profiles.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveProfiles(updated);
  }

  function removeChild(id: string) {
    const updated = profiles.filter((p) => p.id !== id);
    saveProfiles(updated);
    if (activeId === id) {
      const newActive = updated[0]?.id ?? null;
      setActiveId(newActive);
      if (newActive) AsyncStorage.setItem(ACTIVE_KEY, newActive);
      else AsyncStorage.removeItem(ACTIVE_KEY);
    }
  }

  const activeChild = profiles.find((p) => p.id === activeId) ?? profiles[0] ?? null;

  return (
    <ChildContext.Provider
      value={{ children: profiles, activeChild, setActiveChild, addChild, updateChild, removeChild }}
    >
      {childrenProp}
    </ChildContext.Provider>
  );
}

export function useChild() {
  const ctx = useContext(ChildContext);
  if (!ctx) throw new Error("useChild must be used within ChildProvider");
  return ctx;
}
