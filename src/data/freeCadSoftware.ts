
import { CADSoftware } from './cadVersions';

export const freeCadSoftware: CADSoftware[] = [
  {
    id: 100,
    name: "Blender",
    description: "Free, open-source 3D creation suite for modeling, animation, and rendering.",
    rating: 4.6,
    price: 0,
    priceType: "free",
    difficulty: 2,
    categories: ["3D Modeling", "Animation", "Rendering", "3D Printing"],
    platforms: ["Windows", "Mac", "Linux"],
    features: ["Complete 3D pipeline", "Animation tools", "Photorealistic rendering", "Video editing"],
    pros: ["Completely free", "Very powerful", "Active community"],
    cons: ["Complex interface", "Not designed for CAD"],
    bestFor: ["3D modeling", "Animation", "Artistic projects"],
    primaryUse: ["animation", "3dprinting", "any"]
  },
  {
    id: 101,
    name: "FreeCAD",
    description: "Open-source parametric 3D CAD modeler for mechanical engineering.",
    rating: 3.8,
    price: 0,
    priceType: "free",
    difficulty: 3,
    categories: ["3D Modeling", "Mechanical", "Open Source"],
    platforms: ["Windows", "Mac", "Linux"],
    features: ["Parametric modeling", "Python scripting", "FEM analysis"],
    pros: ["Completely free", "Open source", "Parametric modeling"],
    cons: ["Less polished UI", "Can be unstable"],
    bestFor: ["Budget-conscious users", "Learning CAD"],
    primaryUse: ["mechanical", "any"]
  },
  {
    id: 102,
    name: "Tinkercad",
    description: "Simple, browser-based 3D design tool perfect for beginners.",
    rating: 4.2,
    price: 0,
    priceType: "free",
    difficulty: 1,
    categories: ["3D Modeling", "Education", "3D Printing"],
    platforms: ["Web"],
    features: ["Block-based modeling", "3D printing optimization", "Electronics simulation"],
    pros: ["Completely free", "Very easy to learn", "Web-based"],
    cons: ["Limited functionality", "Not for professional use"],
    bestFor: ["Beginners", "Education", "Simple 3D printing"],
    primaryUse: ["3dprinting", "any"]
  }
];
