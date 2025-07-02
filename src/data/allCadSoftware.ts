
import { cadSoftwareVersions } from './cadVersions';
import { freeCadSoftware } from './freeCadSoftware';
import { professionalCadSoftware } from './professionalCadSoftware';

export const allCadSoftware = [
  ...cadSoftwareVersions,
  ...freeCadSoftware,
  ...professionalCadSoftware
].sort((a, b) => {
  // Sort by name first, then by version
  const nameComparison = a.name.localeCompare(b.name);
  if (nameComparison !== 0) return nameComparison;
  
  if (a.version && b.version) {
    return a.version.localeCompare(b.version);
  }
  if (a.version && !b.version) return 1;
  if (!a.version && b.version) return -1;
  return 0;
});

export { CADSoftware } from './cadVersions';
