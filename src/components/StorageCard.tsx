import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Storage } from "@/types/storage";
import { HardDrive, Archive, Trash2, Edit } from "lucide-react";
import { AddProjectDialog } from "./AddProjectDialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface StorageCardProps {
  storage: Storage;
  onProjectAdd: (storageId: string, project: any) => void;
  onStorageDelete?: (storageId: string) => void;
  onStorageEdit?: (storage: Storage) => void;
}

export const StorageCard = ({ 
  storage, 
  onProjectAdd, 
  onStorageDelete,
  onStorageEdit 
}: StorageCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const usedSpace = storage.projects.reduce((acc, project) => acc + project.size, 0);
  const freeSpace = storage.capacity - usedSpace;
  const usagePercentage = (usedSpace / storage.capacity) * 100;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStorageDelete) {
      onStorageDelete(storage.id);
      toast({
        title: "Storage Deleted",
        description: "The storage has been successfully deleted.",
      });
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStorageEdit) {
      onStorageEdit(storage);
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={() => navigate(`/storage/${storage.id}`)}
    >
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
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the storage
                  and all its projects.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <HardDrive
            className={`w-6 h-6 ${storage.type === "SSD" ? "text-accent" : "text-secondary"}`}
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
            <h4 className="font-semibold mb-2">Projects: {storage.projects.length}</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};