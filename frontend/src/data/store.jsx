import React, { createContext, useContext, useState, useEffect } from "react";
import initial from "./content.json";
const Context = createContext(null);
const KEY = "gema-farm-demo-v1";
export function DataProvider({ children }) {
  const [data, setData] = useState(initial),
    [ready, setReady] = useState(false),
    [storageError, setStorageError] = useState("");
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && Object.keys(initial).every((k) => k in saved))
        setData(saved);
    } catch {
      setStorageError(
        "Data demo tersimpan tidak dapat dibaca. Data awal digunakan.",
      );
    }
    setReady(true);
    const sync = (e) => {
      if (e.key === KEY && e.newValue) {
        try {
          const next = JSON.parse(e.newValue);
          if (Object.keys(initial).every((k) => k in next)) setData(next);
        } catch {}
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function commit(next) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setData(next);
      setStorageError("");
      return true;
    } catch {
      setStorageError(
        "Penyimpanan browser penuh atau tidak tersedia. Coba gambar yang lebih kecil.",
      );
      return false;
    }
  }
  function save(type, record) {
    if (type === "settings")
      return commit({ ...data, settings: { ...data.settings, ...record } });
    const id = record.id || crypto.randomUUID();
    const row = {
      ...record,
      id,
      updated_at: new Date().toISOString(),
      created_at: record.created_at || new Date().toISOString(),
    };
    return commit({
      ...data,
      [type]: data[type].some((x) => x.id === id)
        ? data[type].map((x) => (x.id === id ? row : x))
        : [row, ...data[type]],
    });
  }
  function remove(type, id) {
    return commit({ ...data, [type]: data[type].filter((x) => x.id !== id) });
  }
  function reset() {
    return commit(initial);
  }
  return (
    <Context.Provider
      value={{ data, save, remove, reset, ready, storageError }}
    >
      {children}
    </Context.Provider>
  );
}
export const useData = () => useContext(Context);
export function usePublicData() {
  const { data } = useData();
  return {
    ...data,
    categories: data.categories.filter((x) => x.is_active),
    products: data.products.filter(
      (x) =>
        x.is_active &&
        data.categories.some((c) => c.id === x.category_id && c.is_active),
    ),
    programs: data.programs.filter((x) => x.is_active),
    articles: data.articles.filter((x) => x.status === "published"),
    gallery: data.gallery
      .filter((x) => x.is_active)
      .sort((a, b) => a.sort_order - b.sort_order),
  };
}
