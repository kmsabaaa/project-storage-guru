import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Storage, StorageType } from "@/types/storage";
import { useToast } from "@/components/ui/use-toast";

interface AddStorageDialogProps {
  onStorageAdd: (storage: Storage) => void;
}

export const AddStorageDialog = ({ onStorageAdd }: AddStorageDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    manufacturer: "",
    type: "SSD" as StorageType,
    purchaseDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStorage: Storage = {
      id: crypto.randomUUID(),
      ...formData,
      capacity: Number(formData.capacity),
      projects: [],
      archived: false, // Add the archived property
    };
    onStorageAdd(newStorage);
    setOpen(false);
    toast({
      title: "Storage Added",
      description: `${formData.name} has been added successfully.`,
    });
    setFormData({
      name: "",
      capacity: "",
      manufacturer: "",
      type: "SSD",
      purchaseDate: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90">Add Storage</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Storage</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Storage Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="capacity">Capacity (GB)</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input
              id="manufacturer"
              value={formData.manufacturer}
              onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: StorageType) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SSD">SSD</SelectItem>
                <SelectItem value="HDD">HDD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Storage</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};