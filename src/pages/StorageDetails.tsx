import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Storage, Project } from "@/types/storage";
import { AddProjectDialog } from "@/components/AddProjectDialog";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, Edit, MoveRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StorageDetailsProps {
  storages: Storage[];
  onProjectAdd: (storageId: string, project: Project) => void;
  onProjectDelete: (storageId: string, projectId: string) => void;
  onProjectMove: (fromStorageId: string, toStorageId: string, projectId: string) => void;
}

const StorageDetails = ({ storages, onProjectAdd, onProjectDelete, onProjectMove }: StorageDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const storage = storages.find((s) => s.id === id);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (!storage) {
    return (
      <div className="p-6">
        <h1>Storage not found</h1>
        <Button onClick={() => navigate("/")} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Storage List
        </Button>
      </div>
    );
  }

  const handleProjectDelete = (projectId: string) => {
    onProjectDelete(storage.id, projectId);
    toast({
      title: "Project Deleted",
      description: "The project has been successfully deleted.",
    });
  };

  const handleProjectMove = (projectId: string, targetStorageId: string) => {
    onProjectMove(storage.id, targetStorageId, projectId);
    toast({
      title: "Project Moved",
      description: "The project has been successfully moved to another storage.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold">{storage.name}</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-muted-foreground">
                {storage.manufacturer} • {storage.type}
              </p>
              <p className="text-muted-foreground">
                Purchase Date: {new Date(storage.purchaseDate).toLocaleDateString()}
              </p>
            </div>
            <AddProjectDialog storageId={storage.id} onProjectAdd={onProjectAdd} />
          </div>

          <div className="space-y-4">
            {storage.projects.map((project) => (
              <div
                key={project.id}
                className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Client: {project.clientName}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.type.map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={(value) => handleProjectMove(project.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <MoveRight className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Move to..." />
                      </SelectTrigger>
                      <SelectContent>
                        {storages
                          .filter((s) => s.id !== storage.id && !s.archived)
                          .map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleProjectDelete(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageDetails;