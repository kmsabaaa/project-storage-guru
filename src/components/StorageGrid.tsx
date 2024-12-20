import { Storage } from "@/types/storage";
import { StorageCard } from "./StorageCard";

interface StorageGridProps {
  storages: Storage[];
  onProjectAdd: (storageId: string, project: any) => void;
}

export const StorageGrid = ({ storages, onProjectAdd }: StorageGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storages.map((storage) => (
        <StorageCard
          key={storage.id}
          storage={storage}
          onProjectAdd={onProjectAdd}
        />
      ))}
    </div>
  );
};