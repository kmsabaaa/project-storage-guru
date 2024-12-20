import { Input } from "@/components/ui/input";
import { ProjectType, ProjectPrivacy, ProjectStatus } from "@/types/storage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StorageFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: ProjectType | "all";
  setFilterType: (value: ProjectType | "all") => void;
  filterPrivacy: ProjectPrivacy | "all";
  setFilterPrivacy: (value: ProjectPrivacy | "all") => void;
  filterStatus: ProjectStatus | "all";
  setFilterStatus: (value: ProjectStatus | "all") => void;
}

export const StorageFilters = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterPrivacy,
  setFilterPrivacy,
  filterStatus,
  setFilterStatus,
}: StorageFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Input
        placeholder="Search storages and projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      <Select value={filterType} onValueChange={(value: ProjectType | "all") => setFilterType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Coverage">Coverage</SelectItem>
          <SelectItem value="Advertisement">Advertisement</SelectItem>
          <SelectItem value="Documentary">Documentary</SelectItem>
          <SelectItem value="Product Review">Product Review</SelectItem>
          <SelectItem value="TV-Show">TV Show</SelectItem>
          <SelectItem value="Photography">Photography</SelectItem>
          <SelectItem value="Talking Head">Talking Head</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterPrivacy} onValueChange={(value: ProjectPrivacy | "all") => setFilterPrivacy(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Privacy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Privacy Levels</SelectItem>
          <SelectItem value="Private">Private</SelectItem>
          <SelectItem value="Public">Public</SelectItem>
          <SelectItem value="Closed Meeting Only">Closed Meeting Only</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterStatus} onValueChange={(value: ProjectStatus | "all") => setFilterStatus(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Submitted">Submitted</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Not Started">Not Started</SelectItem>
          <SelectItem value="Canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};