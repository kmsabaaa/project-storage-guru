import { StorageGrid } from "@/components/StorageGrid";
import { Storage, Project } from "@/types/storage";
import { useState } from "react";
import { StorageFilters } from "@/components/StorageFilters";
import { StorageHeader } from "@/components/StorageHeader";
import { StorageStats } from "@/components/StorageStats";

interface IndexProps {
  storages: Storage[];
  onStorageAdd: (storage: Storage) => void;
  onStorageEdit: (storage: Storage) => void;
  onStorageDelete: (storageId: string) => void;
  onProjectAdd: (storageId: string, project: Project) => void;
}

const Index = ({ 
  storages, 
  onStorageAdd, 
  onStorageEdit,
  onStorageDelete,
  onProjectAdd 
}: IndexProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all">("all");
  const [filterPrivacy, setFilterPrivacy] = useState<"all">("all");
  const [filterStatus, setFilterStatus] = useState<"all">("all");
  const [showArchive, setShowArchive] = useState(false);

  const filteredStorages = storages.filter((storage) => {
    if (showArchive !== storage.archived) {
      return false;
    }

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      storage.name.toLowerCase().includes(searchLower) ||
      storage.projects.some(
        (project) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.clientName.toLowerCase().includes(searchLower)
      );

    if (!matchesSearch) {
      return false;
    }

    if (filterType !== "all" && !storage.projects.some((project) => project.type.includes(filterType))) {
      return false;
    }

    if (filterPrivacy !== "all" && !storage.projects.some((project) => project.privacy === filterPrivacy)) {
      return false;
    }

    if (filterStatus !== "all" && !storage.projects.some((project) => project.status === filterStatus)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <StorageHeader
          showArchive={showArchive}
          setShowArchive={setShowArchive}
          onStorageAdd={onStorageAdd}
        />
        <StorageStats storages={storages} />
        <StorageFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterPrivacy={filterPrivacy}
          setFilterPrivacy={setFilterPrivacy}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <StorageGrid
          storages={filteredStorages}
          onProjectAdd={onProjectAdd}
          onStorageDelete={onStorageDelete}
          onStorageEdit={onStorageEdit}
        />
      </div>
    </div>
  );
};

export default Index;