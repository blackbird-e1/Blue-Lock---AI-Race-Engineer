import F1PartCard from "./F1PartCard";

interface F1ComponentsExplorerProps {
  onBack: () => void;
}

export default function F1ComponentsExplorer({
  onBack,
}: F1ComponentsExplorerProps) {
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
        <F1PartCard
          title="Front Wing"
          description="Creates front downforce."
          image="https://placehold.co/600x400"
        />

        <F1PartCard
          title="Rear Wing"
          description="Creates rear downforce."
          image="https://placehold.co/600x400"
        />
      </div>
    </div>
  );
}