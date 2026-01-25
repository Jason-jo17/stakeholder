
export const TRIZ_PRINCIPLES = [
  { id: 1, name: "Segmentation", description: "Divide an object into independent parts, or make it easy to disassemble.", examples: ["Replacing large trucks with smaller delivery vans", "Modular furniture"] },
  { id: 2, name: "Extraction (Taking out)", description: "Separate an interfering part or property from an object, or single out the only necessary part.", examples: ["Using the sound of a dog barking as a burglar alarm", "Extracting caffeine from coffee"] },
  { id: 3, name: "Local Quality", description: "Change from a uniform structure to a non-uniform one; have different parts perform different functions.", examples: ["A hammer with a rubber handle for better grip", "A pencil with an eraser"] },
  { id: 4, name: "Asymmetry", description: "Change the shape of an object from symmetrical to asymmetrical.", examples: ["An asymmetric truck for unloading on one side", "Spectacles with different lenses"] },
  { id: 5, name: "Merging", description: "Bring together identical or similar objects, or assemble them to perform continuous operations.", examples: ["Multiple-blade razors", "Computer networks"] },
  { id: 10, name: "Preliminary Action", description: "Perform the required change of an object (either fully or partially) before it is needed.", examples: ["Pre-filled syringes", "Pre-cooked meals"] },
  { id: 13, name: "The Other Way Around", description: "Invert the action used to solve the problem (e.g., move the object instead of the tool).", examples: ["Cleaning a part by vibrating the fluid instead of the part", "An escalator"] },
  { id: 15, name: "Dynamism", description: "Design an object so that its parts can move relative to each other.", examples: ["Folding umbrella", "Adjustable steering wheel"] },
  { id: 28, name: "Mechanics Substitution", description: "Replace a mechanical system with an optical, acoustic, thermal, or combined system.", examples: ["Using a laser pointer instead of a physical one", "Electronic door locks"] },
  { id: 35, name: "Parameter Changes", description: "Change an object's physical state, concentration, density, or temperature.", examples: ["Liquid soap instead of bar soap", "Frozen food for preservation"] },
  // ... Simplified for the MVP, adding 10 representative ones
];

export const SCAMPER_PROMPTS = {
  substitute: ["What can be replaced?", "What other materials could be used?", "Can we change the rules?", "Change the process?"],
  combine: ["What can we combine?", "Can we combine purposes?", "Merge units together?", "Combine talent/resources?"],
  adapt: ["What else is like this?", "What could we copy?", "What other context could this work in?", "Emulate a different industry?"],
  modify: ["What can we magnify?", "What can be added?", "Make it stronger/higher/longer?", "Exaggerate a feature?"],
  putToOtherUses: ["Who else could use this?", "How would a child use it?", "Can it be used in another industry?", "Repurpose waste products?"],
  eliminate: ["What can we simplify?", "Remove a feature?", "Reduce the cost?", "What is non-essential?"],
  reverse: ["Reverse the order?", "Reverse positions?", "Do the opposite?", "Flip the perspective?"]
};

export const TRIZ_PARAMETERS = [
  "Weight of moving object",
  "Weight of non-moving object",
  "Length of moving object",
  "Length of non-moving object",
  "Area of moving object",
  "Speed",
  "Force",
  "Stress or pressure",
  "Shape",
  "Stability",
  "Strength",
  "Durability",
  "Temperature",
  "Brightness",
  "Energy used",
  "Power",
  "Loss of Service",
  "Loss of Information",
  "Loss of Time",
  "Amount of substance",
  "Reliability",
  "Accuracy of measurement",
  "Manufacturing precision",
  "External harm affects object",
  "Object-generated harmful effects",
  "Ease of manufacture",
  "Ease of operation",
  "Ease of repair",
  "Adaptability or versatility",
  "Device complexity",
  "Difficulty of detecting",
  "Extent of automation",
  "Productivity"
];
