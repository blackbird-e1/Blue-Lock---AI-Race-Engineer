import F1PartCard from "./F1PartCard";

interface F1TyreExplorerProps {
  onBack: () => void;
}

export default function F1TyreExplorer({
  onBack,
}: F1TyreExplorerProps) {
  const tyreTopics = [
    {
      title: "Soft Tyre",
      image: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000001/fom-website/campaign/projects/beginner's%20guides/GettyImages-2250892187.webp",
      description: "Maximum grip and performance.",
      category: "Compound",
      metric: "+ Grip",
      details: "Fastest tyre but wears quickly.",
    },
    {
      title: "Medium Tyre",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Pirelli_Tire_Range_%2852849596009%29.jpg/960px-Pirelli_Tire_Range_%2852849596009%29.jpg",
      description: "Balanced performance and durability.",
      category: "Compound",
      metric: "+ Balance",
      details: "Most versatile race tyre.",
    },
    {
      title: "Hard Tyre",
      image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/manual/Misc/pirelli-tyres.webp",
      description: "Longest lasting race tyre.",
      category: "Compound",
      metric: "+ Stint Length",
      details: "Less grip but excellent durability.",
    },
    // {
    //   title: "Tyre Temperature",
    //   description: "Critical for tyre performance.",
    //   category: "Management",
    //   metric: "90-110°C",
    //   details: "Too hot or too cold reduces grip.",
    // },
    // {
    //   title: "Tyre Pressure",
    //   description: "Affects contact patch and handling.",
    //   category: "Setup",
    //   metric: "+ Stability",
    //   details: "Teams carefully manage tyre pressures.",
    // },
    // {
    //   title: "Tyre Wear",
    //   description: "Physical wear of tyre rubber.",
    //   category: "Management",
    //   metric: "- Grip",
    //   details: "Excessive wear impacts lap times.",
    // },
    // {
    //   title: "Tyre Degradation",
    //   description: "Performance loss over time.",
    //   category: "Management",
    //   metric: "- Pace",
    //   details: "One of the biggest race strategy factors.",
    // },
    // {
    //   title: "Pit Stop Strategy",
    //   description: "Choosing the right tyre at the right time.",
    //   category: "Strategy",
    //   metric: "+ Race Position",
    //   details: "Often decides race outcomes.",
    // },
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
        "
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-white text-center mb-3">
        F1 Tyre Intelligence
      </h1>

      <p className="text-gray-400 text-center mb-12">
        Learn how tyres affect performance, strategy and lap times.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {tyreTopics.map((topic) => (
          <F1PartCard
            key={topic.title}
            title={topic.title}
            description={topic.description}
            category={topic.category}
            metric={topic.metric}
            details={topic.details}
            image={topic.image}
          />
        ))}
      </div>
    </div>
  );
}