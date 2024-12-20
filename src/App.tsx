import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StorageDetails from "./pages/StorageDetails";
import { useState, useEffect } from "react";
import { Storage, Project } from "@/types/storage";
import { loadStorages, saveStorages } from "./utils/localStorage";

const queryClient = new QueryClient();

const App = () => {
  const [storages, setStorages] = useState<Storage[]>([]);

  useEffect(() => {
    const loadedStorages = loadStorages();
    setStorages(loadedStorages);
  }, []);

  const handleStorageAdd = (storage: Storage) => {
    const newStorages = [...storages, storage];
    setStorages(newStorages);
    saveStorages(newStorages);
  };

  const handleProjectAdd = (storageId: string, project: Project) => {
    const newStorages = storages.map((storage) => {
      if (storage.id === storageId) {
        return {
          ...storage,
          projects: [...storage.projects, project],
        };
      }
      return storage;
    });
    setStorages(newStorages);
    saveStorages(newStorages);
  };

  const handleProjectDelete = (storageId: string, projectId: string) => {
    const newStorages = storages.map((storage) => {
      if (storage.id === storageId) {
        return {
          ...storage,
          projects: storage.projects.filter((p) => p.id !== projectId),
        };
      }
      return storage;
    });
    setStorages(newStorages);
    saveStorages(newStorages);
  };

  const handleProjectMove = (fromStorageId: string, toStorageId: string, projectId: string) => {
    const fromStorage = storages.find((s) => s.id === fromStorageId);
    const project = fromStorage?.projects.find((p) => p.id === projectId);
    
    if (!project) return;

    const newStorages = storages.map((storage) => {
      if (storage.id === fromStorageId) {
        return {
          ...storage,
          projects: storage.projects.filter((p) => p.id !== projectId),
        };
      }
      if (storage.id === toStorageId) {
        return {
          ...storage,
          projects: [...storage.projects, project],
        };
      }
      return storage;
    });
    
    setStorages(newStorages);
    saveStorages(newStorages);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  storages={storages} 
                  onStorageAdd={handleStorageAdd}
                  onProjectAdd={handleProjectAdd}
                />
              } 
            />
            <Route 
              path="/storage/:id" 
              element={
                <StorageDetails 
                  storages={storages}
                  onProjectAdd={handleProjectAdd}
                  onProjectDelete={handleProjectDelete}
                  onProjectMove={handleProjectMove}
                />
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;