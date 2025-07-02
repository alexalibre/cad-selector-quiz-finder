
export interface CADSoftware {
  id: number;
  name: string;
  version?: string;
  description: string;
  rating: number;
  price: number;
  priceType: "subscription" | "one-time" | "free";
  difficulty: 1 | 2 | 3 | 4;
  categories: string[];
  platforms: string[];
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  primaryUse: string[];
}

export const cadSoftwareVersions: CADSoftware[] = [
  // Alibre versions
  {
    id: 1,
    name: "Alibre Design",
    version: "Atom3D",
    description: "Entry-level 3D CAD software for basic mechanical design and 3D printing.",
    rating: 4.3,
    price: 20,
    priceType: "subscription",
    difficulty: 1,
    categories: ["Mechanical", "3D Modeling", "3D Printing"],
    platforms: ["Windows"],
    features: ["Basic 3D modeling", "STL export", "2D drafting", "Assembly design"],
    pros: ["Very affordable", "Easy to learn", "Good for beginners"],
    cons: ["Limited features", "Windows only"],
    bestFor: ["Beginners", "3D printing", "Simple mechanical design"],
    primaryUse: ["mechanical", "3dprinting", "any"]
  },
  {
    id: 2,
    name: "Alibre Design",
    version: "Professional",
    description: "Professional 3D CAD software with advanced modeling and simulation tools.",
    rating: 4.5,
    price: 50,
    priceType: "subscription",
    difficulty: 2,
    categories: ["Mechanical", "3D Modeling", "Manufacturing", "Product Design"],
    platforms: ["Windows"],
    features: ["Parametric 3D modeling", "Assembly design", "Sheet metal design", "2D drafting", "Basic simulation"],
    pros: ["Excellent value", "User-friendly interface", "Strong parametric modeling"],
    cons: ["Windows only", "Smaller community"],
    bestFor: ["Small businesses", "Mechanical engineering", "Product development"],
    primaryUse: ["mechanical", "industrial", "manufacturing", "any"]
  },
  {
    id: 3,
    name: "Alibre Design",
    version: "Expert",
    description: "Advanced 3D CAD software with comprehensive simulation and analysis tools.",
    rating: 4.6,
    price: 100,
    priceType: "subscription",
    difficulty: 3,
    categories: ["Mechanical", "3D Modeling", "Manufacturing", "Simulation", "Advanced Design"],
    platforms: ["Windows"],
    features: ["Advanced parametric modeling", "Complex assemblies", "FEA simulation", "CFD analysis", "Advanced rendering"],
    pros: ["Comprehensive toolset", "Advanced simulation", "Professional features", "Great support"],
    cons: ["Windows only", "Higher learning curve", "More expensive"],
    bestFor: ["Professional engineers", "Complex product development", "Advanced simulation needs"],
    primaryUse: ["mechanical", "industrial", "manufacturing"]
  },
  // SolidWorks versions
  {
    id: 4,
    name: "SolidWorks",
    version: "Standard",
    description: "Professional 3D CAD software for mechanical design and basic simulation.",
    rating: 4.6,
    price: 400,
    priceType: "subscription",
    difficulty: 3,
    categories: ["3D Modeling", "Mechanical", "Manufacturing"],
    platforms: ["Windows"],
    features: ["Parametric 3D modeling", "Assembly design", "2D drawings", "Basic simulation"],
    pros: ["Industry standard", "Excellent parametric modeling", "Strong community"],
    cons: ["Windows only", "Expensive", "Complex for beginners"],
    bestFor: ["Mechanical engineering", "Product design", "Manufacturing"],
    primaryUse: ["mechanical", "industrial", "manufacturing"]
  },
  {
    id: 5,
    name: "SolidWorks",
    version: "Professional",
    description: "Advanced CAD with photorealistic rendering and advanced simulation tools.",
    rating: 4.7,
    price: 650,
    priceType: "subscription",
    difficulty: 3,
    categories: ["3D Modeling", "Mechanical", "Simulation", "Rendering"],
    platforms: ["Windows"],
    features: ["Advanced modeling", "Photorealistic rendering", "Advanced simulation", "File utilities"],
    pros: ["Comprehensive toolset", "Excellent rendering", "Advanced simulation"],
    cons: ["Very expensive", "Windows only", "Resource intensive"],
    bestFor: ["Professional design teams", "Advanced product development", "Marketing materials"],
    primaryUse: ["mechanical", "industrial", "manufacturing"]
  },
  {
    id: 6,
    name: "SolidWorks",
    version: "Premium",
    description: "Complete CAD suite with advanced simulation, routing, and collaboration tools.",
    rating: 4.8,
    price: 850,
    priceType: "subscription",
    difficulty: 4,
    categories: ["3D Modeling", "Mechanical", "Simulation", "Advanced Design"],
    platforms: ["Windows"],
    features: ["Complete toolset", "Advanced FEA", "Routing design", "Reverse engineering", "Advanced surfacing"],
    pros: ["Most comprehensive", "Professional grade", "Complete solution"],
    cons: ["Very expensive", "Complex", "Requires training"],
    bestFor: ["Large enterprises", "Complex product development", "Professional engineering teams"],
    primaryUse: ["mechanical", "industrial", "manufacturing"]
  },
];
