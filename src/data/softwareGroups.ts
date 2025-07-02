
import { CADSoftware } from './cadVersions';
import { cadSoftwareVersions } from './cadVersions';
import { freeCadSoftware } from './freeCadSoftware';
import { professionalCadSoftware } from './professionalCadSoftware';
import { architecturalCad } from './architecturalCad';
import { mechanicalCad } from './mechanicalCad';
import { freeCadExtended } from './freeCadExtended';
import { specializedCad } from './specializedCad';
import { cloudCad } from './cloudCad';

export interface SoftwareGroup {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  difficultyRange: string;
  versions: CADSoftware[];
  mainVersion: CADSoftware;
}

// Group software by name
const groupSoftwareByName = (software: CADSoftware[]): SoftwareGroup[] => {
  const groups = new Map<string, CADSoftware[]>();
  
  software.forEach(sw => {
    const key = sw.name;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(sw);
  });

  return Array.from(groups.entries()).map(([name, versions]) => {
    versions.sort((a, b) => a.price - b.price);
    const prices = versions.map(v => v.price);
    const difficulties = versions.map(v => v.difficulty);
    
    const priceRange = versions.length > 1 
      ? `$${Math.min(...prices)} - $${Math.max(...prices)}`
      : versions[0].price === 0 ? 'Free' : `$${versions[0].price}`;
    
    const difficultyRange = versions.length > 1
      ? `${Math.min(...difficulties)} - ${Math.max(...difficulties)}`
      : `${versions[0].difficulty}`;

    return {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: versions[0].description,
      priceRange,
      difficultyRange,
      versions,
      mainVersion: versions[0]
    };
  });
};

// All CAD software combined
export const allCadSoftware = [
  ...cadSoftwareVersions,
  ...freeCadSoftware,
  ...professionalCadSoftware,
  ...architecturalCad,
  ...mechanicalCad,
  ...freeCadExtended,
  ...specializedCad,
  ...cloudCad
];

// Grouped software
export const groupedSoftware = groupSoftwareByName(allCadSoftware);

// Individual software list (flat)
export const flatSoftwareList = allCadSoftware.sort((a, b) => {
  const nameComparison = a.name.localeCompare(b.name);
  if (nameComparison !== 0) return nameComparison;
  
  if (a.version && b.version) {
    return a.version.localeCompare(b.version);
  }
  if (a.version && !b.version) return 1;
  if (!a.version && b.version) return -1;
  return 0;
});

export type { CADSoftware } from './cadVersions';
