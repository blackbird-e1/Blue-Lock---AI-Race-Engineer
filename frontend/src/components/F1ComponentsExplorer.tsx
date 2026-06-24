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
      image: "https://www.formulaonehistory.com/wp-content/uploads/2024/01/Ferrari-F1-Front-Wing-1024x647.webp",
      description: "Creates front downforce and directs airflow.",
      category: "Aero",
      metric: "+ Front Grip",
      details: "Controls airflow around the car and improves corner entry.",
    },
    {
      title: "Rear Wing",
      image: "https://scuderiafans.com/wp-content/uploads/2025/04/Ferrari-SF25-rear-wing.png.webp",
      description: "Creates rear downforce and improves stability.",
      category: "Aero",
      metric: "+ Rear Stability",
      details: "Provides rear-end grip and affects straight-line speed.",
    },
    {
      title: "Floor",
      image: "https://preview.redd.it/f1-75-underfloor-v0-lrsgx3y01ov81.jpg?auto=webp&s=4b7b3428766ae06eb57783d1855cc5757697c31b",
      description: "Generates ground-effect downforce.",
      category: "Aero",
      metric: "+ Downforce",
      details: "The biggest source of downforce on modern F1 cars.",
    },
    {
      title: "Diffuser",
      image: "https://cdn-1.motorsport.com/static/img/archive/autosport/news/149705_1009052/s8/1009052.jpg",
      description: "Accelerates airflow under the car.",
      category: "Aero",
      metric: "+ Aero Efficiency",
      details: "Works with the floor to create low-pressure airflow.",
    },
    {
      title: "Sidepods",
      image: "https://www.formulaonehistory.com/wp-content/uploads/2023/12/Sidepods-On-An-F1-Car-1024x647.webp",
      description: "Provide cooling and airflow management.",
      category: "Aero",
      metric: "+ Cooling",
      details: "Direct airflow toward the rear and cool internal systems.",
    },
    {
      title: "Suspension",
      image: "https://images.ctfassets.net/1fvlg6xqnm65/3Ym0sCW2nEpf8UZPq9xiXe/5acbb4ba990391552922170fbc5cae94/MQ6-10-image-20191104195321-1-1.jpg?w=1080&q=75&fm=webp",
      description: "Maintains tire contact with the track.",
      category: "Mechanical",
      metric: "+ Handling",
      details: "Helps maximize grip and driver confidence.",
    },
    {
      title: "Brake System",
      image: "https://www.piston.my/wp-content/uploads/2021/09/F1-5.jpg",
      description: "Controls stopping power and brake temperatures.",
      category: "Mechanical",
      metric: "+ Braking",
      details: "Allows late braking and consistent stopping performance.",
    },
    {
      title: "Power Unit",
      image: "https://global.honda/en/tech/motorsports/Formula-1/Powertrain_Why_Challenge_F1_Power_Units/images/01.webp",
      description: "Hybrid engine system powering the car.",
      category: "Powertrain",
      metric: "+ Horsepower",
      details: "Combines internal combustion and electric power.",
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
            image={component.image}
            category={component.category}
            metric={component.metric}
            details={component.details}
          />
        ))}
      </div>
    </div>
  );
}