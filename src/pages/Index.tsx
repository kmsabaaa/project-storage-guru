import { Button } from "@/components/ui/button";
import { StorageGrid } from "@/components/StorageGrid";
import { Storage } from "@/types/storage";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for initial development
const mockStorages: Storage[] = [
  {
    id: "1",
    name: "Main Storage",
    capacity: 1000,
    manufacturer: "Samsung",
    purchaseDate: "2024-01-01",
    type: "SSD",
    projects: [
      {
        id: "p1",
        name: "Summer Campaign",
        clientName: "Nike",
        privacy: "Public",
        date: "2024-03-15",
        type: ["Advertisement"],
        status: "Pending",
        size: 250,
      },
    ],
  },
  {
    id: "2",
    name: "Backup Drive",
    capacity: 2000,
    manufacturer: "Western Digital",
    purchaseDate: "2023-12-01",
    type: "HDD",
    projects: [
      {
        id: "p2",
        name: "Nature Documentary",
        clientName: "National Geographic",
        privacy: "Private",
        date: "2024-02-20",
        type: ["Documentary"],
        status: "Not Started",
        size: 500,
      },
    ],
  },
];

const Index = () => {
  const [storages, setStorages] = useState<Storage[]>(mockStorages);
  const { toast } = useToast();

  const handleStorageClick = (storage: Storage) => {
    toast({
      title: storage.name,
      description: `${storage.projects.length} projects, ${storage.capacity}GB total capacity`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-primary">Storage Manager</h1>
          <Button className="bg-accent hover:bg-accent/90">
            <Plus className="mr-2 h-4 w-4" /> Add Storage
          </Button>
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

        <StorageGrid storages={storages} onStorageClick={handleStorageClick} />
      </div>
    </div>
  );
};

export default Index;