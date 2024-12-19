import { useState } from "react";
import { StorageGrid } from "@/components/StorageGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Storage, Project, ProjectType, ProjectPrivacy, ProjectStatus } from "@/types/storage";
import { Select } from "@/components/ui/select";
import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [storages, setStorages] = useState<Storage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<ProjectType | "">("");
  const [filterPrivacy, setFilterPrivacy] = useState<ProjectPrivacy | "">("");
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "">("");
  const [showArchive, setShowArchive] = useState(false);

  const handleStorageClick = (storage: Storage) => {
    console.log("Storage clicked:", storage);
  };

  const handleProjectAdd = (storageId: string, project: Project) => {
    setStorages(
      storages.map((storage) => {
        if (storage.id === storageId) {
          return {
            ...storage,
            projects: [...storage.projects, project],
          };
        }
        return storage;
      })
    );
  };

  const filteredStorages = storages.filter((storage) => {
    // Filter by archive status
    if (showArchive !== storage.archived) {
      return false;
    }

    // Search term filtering
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

    // Project type filtering
    if (filterType && !storage.projects.some((project) => project.type.includes(filterType))) {
      return false;
    }

    // Privacy filtering
    if (filterPrivacy && !storage.projects.some((project) => project.privacy === filterPrivacy)) {
      return false;
    }

    // Status filtering
    if (filterStatus && !storage.projects.some((project) => project.status === filterStatus)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-primary">Storage Manager</h1>
            <Button
              variant="outline"
              onClick={() => setShowArchive(!showArchive)}
              className="ml-2"
            >
              {showArchive ? "Show Active" : "Show Archive"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Search storages and projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />

            <SelectPrimitive onValueChange={(value) => setFilterType(value as ProjectType)} value={filterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Coverage">Coverage</SelectItem>
                <SelectItem value="Advertisement">Advertisement</SelectItem>
                <SelectItem value="Documentary">Documentary</SelectItem>
                <SelectItem value="Product Review">Product Review</SelectItem>
                <SelectItem value="TV-Show">TV Show</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Talking Head">Talking Head</SelectItem>
              </SelectContent>
            </SelectPrimitive>

            <SelectPrimitive onValueChange={(value) => setFilterPrivacy(value as ProjectPrivacy)} value={filterPrivacy}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Privacy Levels</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Closed Meeting Only">Closed Meeting Only</SelectItem>
              </SelectContent>
            </SelectPrimitive>

            <SelectPrimitive onValueChange={(value) => setFilterStatus(value as ProjectStatus)} value={filterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </SelectPrimitive>
          </div>
        </div>

        <StorageGrid
          storages={filteredStorages}
          onStorageClick={handleStorageClick}
          onProjectAdd={handleProjectAdd}
        />
      </div>
    </div>
  );
};

export default Index;