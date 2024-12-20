import { Storage, Project, ProjectType, ProjectPrivacy, ProjectStatus } from "@/types/storage";

const projectTypes: ProjectType[] = [
  "Coverage",
  "Advertisement",
  "Documentary",
  "Product Review",
  "TV-Show",
  "Photography",
  "Talking Head"
];

const projectStatuses: ProjectStatus[] = [
  "Submitted",
  "Pending",
  "Not Started",
  "Canceled"
];

const projectPrivacyLevels: ProjectPrivacy[] = [
  "Private",
  "Public",
  "Closed Meeting Only"
];

const generateProject = (index: number): Project => ({
  id: crypto.randomUUID(),
  name: `Project ${index + 1}`,
  clientName: `Client ${index + 1}`,
  privacy: projectPrivacyLevels[Math.floor(Math.random() * projectPrivacyLevels.length)],
  date: new Date().toISOString(),
  type: [projectTypes[Math.floor(Math.random() * projectTypes.length)]],
  status: projectStatuses[Math.floor(Math.random() * projectStatuses.length)],
  size: Math.floor(Math.random() * 100) + 1,
});

export const generateDummyData = (): Storage[] => {
  const storages: Storage[] = [
    {
      id: crypto.randomUUID(),
      name: "Main Storage",
      capacity: 1000,
      manufacturer: "Samsung",
      type: "SSD",
      purchaseDate: "2024-01-15",
      projects: Array.from({ length: 5 }, (_, i) => generateProject(i)),
      archived: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Backup Drive",
      capacity: 2000,
      manufacturer: "Western Digital",
      type: "HDD",
      purchaseDate: "2024-02-01",
      projects: Array.from({ length: 5 }, (_, i) => generateProject(i + 5)),
      archived: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Archive Storage",
      capacity: 4000,
      manufacturer: "Seagate",
      type: "HDD",
      purchaseDate: "2024-01-01",
      projects: Array.from({ length: 5 }, (_, i) => generateProject(i + 10)),
      archived: true,
    },
  ];

  return storages;
};