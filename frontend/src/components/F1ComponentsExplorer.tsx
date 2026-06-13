import F1PartCard from "./F1PartCard";

interface F1ComponentsExplorerProps {
  onBack: () => void;
}

export default function F1ComponentsExplorer({
  onBack,
}: F1ComponentsExplorerProps) {
  const components = [
    {
      title: "Front Wing",
      description: "Creates front downforce and directs airflow.",
      category: "Aero",
      metric: "+ Front Grip",
      details: "Controls airflow around the car and improves corner entry.",
    },
    {
      title: "Rear Wing",
      description: "Creates rear downforce and improves stability.",
      category: "Aero",
      metric: "+ Rear Stability",
      details: "Provides rear-end grip and affects straight-line speed.",
    },
    {
      title: "Floor",
      description: "Generates ground-effect downforce.",
      category: "Aero",
      metric: "+ Downforce",
      details: "The biggest source of downforce on modern F1 cars.",
    },
    {
      title: "Diffuser",
      description: "Accelerates airflow under the car.",
      category: "Aero",
      metric: "+ Aero Efficiency",
      details: "Works with the floor to create low-pressure airflow.",
    },
    {
      title: "Sidepods",
      description: "Provide cooling and airflow management.",
      category: "Aero",
      metric: "+ Cooling",
      details: "Direct airflow toward the rear and cool internal systems.",
    },
    {
      title: "Suspension",
      description: "Maintains tire contact with the track.",
      category: "Mechanical",
      metric: "+ Handling",
      details: "Helps maximize grip and driver confidence.",
    },
    {
      title: "Brake System",
      description: "Controls stopping power and brake temperatures.",
      category: "Mechanical",
      metric: "+ Braking",
      details: "Allows late braking and consistent stopping performance.",
    },
    {
      title: "Power Unit",
      description: "Hybrid engine system powering the car.",
      category: "Powertrain",
      metric: "+ Horsepower",
      details: "Combines internal combustion and electric power.",
    },
    {
      title: "DRS",
      description: "Reduces drag for higher straight-line speed.",
      category: "Aero",
      metric: "+ Top Speed",
      details: "Opens the rear wing flap to reduce aerodynamic drag.",
    },
    {
      title: "Tyres",
      description: "Provide grip, traction, and race strategy options.",
      category: "Mechanical",
      metric: "+ Grip",
      details: "The only contact point between car and track.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <button
        onClick={onBack}
        className="
          mb-10
          px-4
          py-2
          rounded-lg
          border
          border-[#2e2e2e]
          text-white
          hover:bg-[#1a1a1a]
          transition-colors
          cursor-pointer
        "
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-white text-center mb-3">
        F1 Components Explorer
      </h1>

      <p className="text-gray-400 text-center mb-12">
        Learn how each Formula 1 component contributes to car performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {components.map((component) => (
          <F1PartCard
            key={component.title}
            title={component.title}
            description={component.description}
            image="https://placehold.co/600x400"
            category={component.category}
            metric={component.metric}
            details={component.details}
          />
        ))}
      </div>
    </div>
  );
}