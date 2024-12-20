import { Storage } from "@/types/storage";
import { StorageCard } from "./StorageCard";

interface StorageGridProps {
  storages: Storage[];
  onProjectAdd: (storageId: string, project: any) => void;
  onStorageDelete: (storageId: string) => void;
  onStorageEdit: (storage: Storage) => void;
}

export const StorageGrid = ({ 
  storages, 
  onProjectAdd,
  onStorageDelete,
  onStorageEdit
}: StorageGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storages.map((storage) => (
        <StorageCard
          key={storage.id}
          storage={storage}
          onProjectAdd={onProjectAdd}
          onStorageDelete={onStorageDelete}
          onStorageEdit={onStorageEdit}
        />
      ))}
    </div>
  );
};