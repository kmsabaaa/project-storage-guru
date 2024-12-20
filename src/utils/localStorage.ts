import { Storage } from "@/types/storage";

const STORAGE_KEY = "storage_manager_data";

export const saveStorages = (storages: Storage[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storages));
};

export const loadStorages = (): Storage[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};