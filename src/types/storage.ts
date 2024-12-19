export type StorageType = "SSD" | "HDD";
export type ProjectPrivacy = "Private" | "Public" | "Closed Meeting Only";
export type ProjectStatus = "Submitted" | "Pending" | "Not Started" | "Canceled";
export type ProjectType =
  | "Coverage"
  | "Advertisement"
  | "Documentary"
  | "Product Review"
  | "TV-Show"
  | "Photography"
  | "Talking Head";

export interface Project {
  id: string;
  name: string;
  clientName: string;
  privacy: ProjectPrivacy;
  date: string;
  type: ProjectType[];
  status: ProjectStatus;
  clientFeedback?: string;
  rating?: number;
  link?: string;
  size: number; // in GB
}

export interface Storage {
  id: string;
  name: string;
  capacity: number; // in GB
  color?: string;
  manufacturer: string;
  purchaseDate: string;
  type: StorageType;
  projects: Project[];
}