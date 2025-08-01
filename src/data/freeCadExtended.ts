
import { CADSoftware } from './cadVersions';

export const freeCadExtended: CADSoftware[] = [
  {
    id: 500,
    name: "OpenSCAD",
    description: "Script-based 3D CAD modeler for programmers.",
    rating: 4.0,
    price: 0,
    priceType: "free",
    difficulty: 3,
    categories: ["3D Modeling", "Programming", "Open Source"],
    platforms: ["Windows", "Mac", "Linux"],
    features: ["Script-based modeling", "Parametric", "Boolean operations", "Export STL"],
    pros: ["Completely free", "Parametric", "Version control friendly"],
    cons: ["Programming required", "No GUI modeling", "Limited features"],
    bestFor: ["Programmers", "Parametric design", "Simple parts"],
    primaryUse: ["3dprinting", "mechanical", "any"]
  },
  {
    id: 501,
    name: "LibreCAD",
    description: "Free 2D CAD application for technical drawings.",
    rating: 3.9,
    price: 0,
    priceType: "free",
    difficulty: 2,
    categories: ["2D Drafting", "Open Source", "Technical Drawing"],
    platforms: ["Windows", "Mac", "Linux"],
    features: ["2D drafting", "DXF support", "Layers", "Dimensioning"],
    pros: ["Completely free", "Cross-platform", "Good for 2D"],
    cons: ["2D only", "Limited features", "Basic interface"],
    bestFor: ["2D drafting", "Students", "Simple drawings"],
    primaryUse: ["drafting", "any"]
  },
  {
    id: 502,
    name: "Wings 3D",
    description: "Subdivision modeler for organic 3D shapes.",
    rating: 3.8,
    price: 0,
    priceType: "free",
    difficulty: 2,
    categories: ["3D Modeling", "Organic Modeling", "Open Source"],
    platforms: ["Windows", "Mac", "Linux"],
    features: ["Subdivision modeling", "UV mapping", "Export options", "Sculpting"],
    pros: ["Free", "Good for organic shapes", "Easy to learn"],
    cons: ["Limited features", "No animation", "Basic rendering"],
    bestFor: ["Organic modeling", "Game assets", "Hobbyists"],
    primaryUse: ["3dprinting", "gaming", "any"]
  },
  {
    id: 503,
    name: "SolveSpace",
    description: "Parametric 2D/3D CAD with constraint solver.",
    rating: 4.1,
    price: 0,
    priceType: "free",
    difficulty: 2,
    categories: ["Parametric", "3D Modeling", "Open Source"],
    platforms: ["Windows", "Mac", "Linux"],
    features: ["Parametric modeling", "Constraint solver", "2D/3D", "Lightweight"],
    pros: ["Free", "Parametric", "Lightweight", "Good constraint solver"],
    cons: ["Limited features", "Small community", "Basic interface"],
    bestFor: ["Simple mechanical parts", "Students", "Constraint-based design"],
    primaryUse: ["mechanical", "3dprinting", "any"]
  },
  {
    id: 504,
    name: "BRL-CAD",
    description: "Constructive solid geometry CAD system.",
    rating: 3.7,
    price: 0,
    priceType: "free",
    difficulty: 4,
    categories: ["Military", "CSG", "Open Source"],
    platforms: ["Windows", "Mac", "Linux"],
    features: ["CSG modeling", "Ray tracing", "Ballistics analysis", "Geometric analysis"],
    pros: ["Free", "Powerful CSG", "Military grade", "Cross-platform"],
    cons: ["Very complex", "Steep learning curve", "Specialized use"],
    bestFor: ["Military applications", "CSG modeling", "Analysis"],
    primaryUse: ["military", "analysis", "mechanical"]
  }
];
