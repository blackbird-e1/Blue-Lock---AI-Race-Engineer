interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({
  isOpen,
  onClose,
}: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
         onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
           className="w-full max-w-2xl rounded-3xl border border-[#2e2e2e] bg-[#111111] p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition"
        >
          ×
        </button>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-3">
            About Blue Lock
          </h2>

          <p className="text-gray-400 leading-7">
            Blue Lock is an AI-powered race engineering platform designed
            to help drivers, sim racers, teams, and motorsport analysts
            understand telemetry data instantly.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              What We Do
            </h3>

            <p className="text-gray-400 leading-7">
              Upload motorsport telemetry CSV files and receive instant
              AI-generated race engineering insights including braking
              analysis, throttle behavior, steering inputs, performance
              comparison, and coaching recommendations.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              Who This Is For
            </h3>

            <p className="text-gray-400 leading-7">
              Professional drivers, sim racers, race engineers,
              academies, performance analysts, and motorsport teams.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-2">
              Contact
            </h3>

            <p className="text-gray-400 leading-7">
              Email: your@email.com
              <br />
              LinkedIn: linkedin.com/in/yourprofile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}