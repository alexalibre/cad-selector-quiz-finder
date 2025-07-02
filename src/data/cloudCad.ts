
import { CADSoftware } from './cadVersions';

export const cloudCad: CADSoftware[] = [
  {
    id: 700,
    name: "Onshape",
    description: "Cloud-based professional CAD platform.",
    rating: 4.5,
    price: 125,
    priceType: "subscription",
    difficulty: 2,
    categories: ["Cloud CAD", "Collaboration", "Mechanical"],
    platforms: ["Web", "Mobile"],
    features: ["Cloud-based", "Real-time collaboration", "Version control", "Mobile access"],
    pros: ["True cloud CAD", "Excellent collaboration", "Always up-to-date"],
    cons: ["Requires internet", "Subscription only", "Limited offline"],
    bestFor: ["Distributed teams", "Collaboration", "Modern workflows"],
    primaryUse: ["mechanical", "collaboration", "any"]
  },
  {
    id: 701,
    name: "Shapr3D",
    description: "CAD software designed for iPad and desktop.",
    rating: 4.2,
    price: 25,
    priceType: "subscription",
    difficulty: 1,
    categories: ["Mobile CAD", "3D Modeling", "iPad"],
    platforms: ["iPad", "Windows", "Mac"],
    features: ["Touch interface", "Apple Pencil support", "Desktop sync", "AR visualization"],
    pros: ["Excellent on iPad", "Intuitive interface", "Apple Pencil support"],
    cons: ["Limited features", "iPad focused", "Subscription required"],
    bestFor: ["iPad users", "Conceptual design", "On-the-go modeling"],
    primaryUse: ["mobile", "conceptual", "any"]
  },
  {
    id: 702,
    name: "Vectary",
    description: "Browser-based 3D design and collaboration platform.",
    rating: 4.0,
    price: 20,
    priceType: "subscription",
    difficulty: 1,
    categories: ["Web CAD", "3D Design", "Collaboration"],
    platforms: ["Web"],
    features: ["Browser-based", "Real-time collaboration", "AR/VR export", "Templates"],
    pros: ["No installation needed", "Easy collaboration", "Modern interface"],
    cons: ["Limited features", "Requires internet", "Browser dependent"],
    bestFor: ["Quick prototypes", "Web designers", "Collaboration"],
    primaryUse: ["web", "prototyping", "any"]
  },
  {
    id: 703,
    name: "BricsCAD",
    description: "DWG-compatible CAD platform with AI features.",
    rating: 4.3,
    price: 500,
    priceType: "one-time",
    difficulty: 2,
    categories: ["2D/3D CAD", "DWG Compatible", "AI"],
    platforms: ["Windows", "Mac", "Linux"],
    features: ["DWG compatibility", "AI-powered features", "2D/3D", "Cloud collaboration"],
    pros: ["DWG compatible", "AI features", "Perpetual license", "Cross-platform"],
    cons: ["Smaller market share", "Learning curve", "Limited plugins"],
    bestFor: ["AutoCAD alternative", "AI-assisted design", "Cross-platform users"],
    primaryUse: ["drafting", "architectural", "any"]
  }
];
