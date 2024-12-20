import { Storage } from "@/types/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive, Database, Archive, BarChart } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StorageStatsProps {
  storages: Storage[];
}

export const StorageStats = ({ storages }: StorageStatsProps) => {
  const totalCapacity = storages.reduce((acc, storage) => acc + storage.capacity, 0);
  const totalUsedSpace = storages.reduce(
    (acc, storage) =>
      acc + storage.projects.reduce((sum, project) => sum + project.size, 0),
    0
  );
  const totalProjects = storages.reduce(
    (acc, storage) => acc + storage.projects.length,
    0
  );
  const archivedStorages = storages.filter((storage) => storage.archived).length;

  const storageData = storages.map((storage) => {
    const usedSpace = storage.projects.reduce(
      (acc, project) => acc + project.size,
      0
    );
    return {
      name: storage.name,
      capacity: storage.capacity,
      used: usedSpace,
      free: storage.capacity - usedSpace,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity.toFixed(1)} GB</div>
            <p className="text-xs text-muted-foreground">
              Used: {totalUsedSpace.toFixed(1)} GB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              Across {storages.length} storages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archived Storages</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archivedStorages}</div>
            <p className="text-xs text-muted-foreground">
              Out of {storages.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((totalUsedSpace / totalCapacity) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average usage across storages
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Storage Capacity Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={storageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="used" stackId="a" fill="#ef4444" name="Used Space" />
              <Bar dataKey="free" stackId="a" fill="#22c55e" name="Free Space" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};