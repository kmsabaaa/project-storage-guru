import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Storage } from "@/types/storage";
import { HardDrive } from "lucide-react";

interface StorageCardProps {
  storage: Storage;
  onClick: () => void;
}

export const StorageCard = ({ storage, onClick }: StorageCardProps) => {
  const usedSpace = storage.projects.reduce((acc, project) => acc + project.size, 0);
  const freeSpace = storage.capacity - usedSpace;
  const usagePercentage = (usedSpace / storage.capacity) * 100;

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{storage.name}</CardTitle>
        <HardDrive className={`w-6 h-6 ${storage.type === "SSD" ? "text-accent" : "text-secondary"}`} />
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
        </div>
      </CardContent>
    </Card>
  );
};