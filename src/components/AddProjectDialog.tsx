import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Project, ProjectPrivacy, ProjectStatus, ProjectType } from "@/types/storage";
import { useToast } from "@/components/ui/use-toast";

interface AddProjectDialogProps {
  storageId: string;
  onProjectAdd: (storageId: string, project: Project) => void;
}

export const AddProjectDialog = ({ storageId, onProjectAdd }: AddProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    clientName: "",
    privacy: "Private" as ProjectPrivacy,
    date: "",
    type: [] as ProjectType[],
    status: "Not Started" as ProjectStatus,
    size: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: crypto.randomUUID(),
      ...formData,
      size: Number(formData.size),
    };
    onProjectAdd(storageId, newProject);
    setOpen(false);
    toast({
      title: "Project Added",
      description: `${formData.name} has been added successfully.`,
    });
    setFormData({
      name: "",
      clientName: "",
      privacy: "Private",
      date: "",
      type: [],
      status: "Not Started",
      size: "",
    });
  };

  const projectTypes: ProjectType[] = [
    "Coverage",
    "Advertisement",
    "Documentary",
    "Product Review",
    "TV-Show",
    "Photography",
    "Talking Head",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Add Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="privacy">Privacy</Label>
            <Select
              value={formData.privacy}
              onValueChange={(value: ProjectPrivacy) => setFormData({ ...formData, privacy: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Closed Meeting Only">Closed Meeting Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Project Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              value={formData.type[0]}
              onValueChange={(value: ProjectType) => 
                setFormData({ ...formData, type: [...formData.type, value] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: ProjectStatus) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="size">Size (GB)</Label>
            <Input
              id="size"
              type="number"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};