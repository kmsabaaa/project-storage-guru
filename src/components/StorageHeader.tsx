import { Button } from "@/components/ui/button";
import { AddStorageDialog } from "@/components/AddStorageDialog";
import { Storage } from "@/types/storage";

interface StorageHeaderProps {
  showArchive: boolean;
  setShowArchive: (value: boolean) => void;
  onStorageAdd: (storage: Storage) => void;
}

export const StorageHeader = ({ showArchive, setShowArchive, onStorageAdd }: StorageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-primary">Storage Manager</h1>
      <div className="flex gap-2">
        <AddStorageDialog onStorageAdd={onStorageAdd} />
        <Button
          variant="outline"
          onClick={() => setShowArchive(!showArchive)}
        >
          {showArchive ? "Show Active" : "Show Archive"}
        </Button>
      </div>
    </div>
  );
};