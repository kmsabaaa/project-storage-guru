import { Button } from "@/components/ui/button";
import { StorageGrid } from "@/components/StorageGrid";
import { Storage, Project } from "@/types/storage";
import { Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { AddStorageDialog } from "@/components/AddStorageDialog";

const Index = () => {
  const [storages, setStorages] = useState<Storage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleStorageClick = (storage: Storage) => {
    toast({
      title: storage.name,
      description: `${storage.projects.length} projects, ${storage.capacity}GB total capacity`,
    });
  };

  const handleStorageAdd = (newStorage: Storage) => {
    setStorages([...storages, newStorage]);
  };

  const handleProjectAdd = (storageId: string, project: Project) => {
    setStorages(storages.map(storage => {
      if (storage.id === storageId) {
        return {
          ...storage,
          projects: [...storage.projects, project]
        };
      }
      return storage;
    }));
  };

  const filteredStorages = storages.filter(storage => {
    const searchLower = searchTerm.toLowerCase();
    return (
      storage.name.toLowerCase().includes(searchLower) ||
      storage.projects.some(project => 
        project.name.toLowerCase().includes(searchLower) ||
        project.clientName.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-primary">Storage Manager</h1>
          <AddStorageDialog onStorageAdd={handleStorageAdd} />
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search storages and projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Total Storage</h3>
            <p className="text-2xl font-bold">
              {storages.reduce((acc, storage) => acc + storage.capacity, 0)}GB
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Total Projects</h3>
            <p className="text-2xl font-bold">
              {storages.reduce((acc, storage) => acc + storage.projects.length, 0)}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Storage Units</h3>
            <p className="text-2xl font-bold">{storages.length}</p>
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