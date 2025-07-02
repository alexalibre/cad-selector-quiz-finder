
import { CADSoftware } from './cadVersions';

export const professionalCadSoftware: CADSoftware[] = [
  {
    id: 200,
    name: "AutoCAD",
    description: "Industry-standard 2D and 3D CAD software for drafting and design.",
    rating: 4.3,
    price: 200,
    priceType: "subscription",
    difficulty: 3,
    categories: ["2D Drafting", "3D Modeling", "Architecture"],
    platforms: ["Windows", "Mac", "Web"],
    features: ["2D drafting", "3D modeling", "Industry toolsets", "Cloud collaboration"],
    pros: ["Industry standard", "Comprehensive toolset", "Wide file format support"],
    cons: ["Expensive", "Steep learning curve"],
    bestFor: ["Professional drafting", "Architecture"],
    primaryUse: ["mechanical", "architectural", "any"]
  },
  {
    id: 201,
    name: "Fusion 360",
    description: "Cloud-based CAD/CAM/CAE platform for product development.",
    rating: 4.4,
    price: 60,
    priceType: "subscription",
    difficulty: 2,
    categories: ["3D Modeling", "CAM", "Simulation"],
    platforms: ["Windows", "Mac", "Web"],
    features: ["Parametric modeling", "Integrated CAM", "Cloud collaboration", "Simulation tools"],
    pros: ["Cloud-based collaboration", "Integrated CAM", "Affordable"],
    cons: ["Requires internet", "Can be slow"],
    bestFor: ["Product design", "3D printing", "Small teams"],
    primaryUse: ["mechanical", "3dprinting", "industrial", "any"]
  },
  {
    id: 202,
    name: "Inventor",
    description: "Professional 3D mechanical design and simulation software.",
    rating: 4.3,
    price: 250,
    priceType: "subscription",
    difficulty: 3,
    categories: ["3D Modeling", "Mechanical", "Simulation"],
    platforms: ["Windows"],
    features: ["Parametric modeling", "Assembly design", "Stress analysis", "Sheet metal design"],
    pros: ["Strong parametric modeling", "Good simulation tools"],
    cons: ["Windows only", "Expensive"],
    bestFor: ["Mechanical design", "Manufacturing"],
    primaryUse: ["mechanical", "industrial", "manufacturing"]
  }
];
