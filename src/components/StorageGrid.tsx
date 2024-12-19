import { Storage } from "@/types/storage";
import { StorageCard } from "./StorageCard";

interface StorageGridProps {
  storages: Storage[];
  onStorageClick: (storage: Storage) => void;
}

export const StorageGrid = ({ storages, onStorageClick }: StorageGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storages.map((storage) => (
        <StorageCard
          key={storage.id}
          storage={storage}
          onClick={() => onStorageClick(storage)}
        />
      ))}
    </div>
  );
};