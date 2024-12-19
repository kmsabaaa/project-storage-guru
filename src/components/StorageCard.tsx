import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Storage } from "@/types/storage";
import { HardDrive, Archive } from "lucide-react";
import { AddProjectDialog } from "./AddProjectDialog";
import { Badge } from "@/components/ui/badge";

interface StorageCardProps {
  storage: Storage;
  onClick: () => void;
  onProjectAdd: (storageId: string, project: any) => void;
}

export const StorageCard = ({ storage, onClick, onProjectAdd }: StorageCardProps) => {
  const usedSpace = storage.projects.reduce((acc, project) => acc + project.size, 0);
  const freeSpace = storage.capacity - usedSpace;
  const usagePercentage = (usedSpace / storage.capacity) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl font-bold">{storage.name}</CardTitle>
          {storage.archived && (
            <Badge variant="secondary">
              <Archive className="w-3 h-3 mr-1" />
              Archived
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <AddProjectDialog storageId={storage.id} onProjectAdd={onProjectAdd} />
          <HardDrive
            className={`w-6 h-6 ${storage.type === "SSD" ? "text-accent" : "text-secondary"}`}
            onClick={onClick}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{storage.manufacturer}</span>
            <span>{storage.type}</span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-success">{freeSpace.toFixed(1)} GB free</span>
            <span className="text-destructive">{usedSpace.toFixed(1)} GB used</span>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Projects ({storage.projects.length})</h4>
            <div className="space-y-2">
              {storage.projects.map((project) => (
                <div key={project.id} className="text-sm p-2 bg-muted rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">{project.name}</span>
                    <span>{project.size}GB</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{project.clientName}</span>
                    <span>{project.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.type.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};