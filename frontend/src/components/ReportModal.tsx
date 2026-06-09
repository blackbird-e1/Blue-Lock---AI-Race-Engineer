import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReportModal({
  isOpen,
  onClose,
}: Props) {

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        overflow-y-auto
        bg-black/80
        p-4
      "
    >
      <div
        className="
          min-h-full
          flex
          items-start
          justify-center
          py-8
        "
      >
        <div
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
            w-full
            max-w-5xl
            rounded-2xl
            border
            border-[#2e2e2e]
            bg-[#111111]
            shadow-2xl
            overflow-hidden
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2e2e2e] px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-red-500">
                Telemetry Report
              </p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                Driver Analysis
              </h2>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Content */}
            <div className="space-y-6 p-6">

            {/* Overview */}
            <section className="rounded-xl border border-[#2e2e2e] p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">
                Overall Assessment
                </h3>

                <p className="text-gray-300">
                Detected telemetry concerns related to gear
                shifting behaviour. Driver demonstrates
                stable throttle usage but opportunities
                exist for improved shift timing.
                </p>
            </section>

            {/* Key Findings */}
            <section className="rounded-xl border border-[#2e2e2e] p-5">
                <h3 className="mb-4 text-lg font-semibold text-white">
                Key Findings
                </h3>

                <div className="space-y-3">

                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                    <p className="font-medium text-red-400">
                    Delayed Upshifts
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                    Upshifts occur later than optimal,
                    resulting in excess RPM before gear
                    changes.
                    </p>
                </div>

                </div>
            </section>

            {/* Metrics */}
            <section className="rounded-xl border border-[#2e2e2e] p-5">
                <h3 className="mb-4 text-lg font-semibold text-white">
                Performance Metrics
                </h3>

                <div className="grid gap-4 md:grid-cols-4">

                <MetricCard
                    label="Throttle"
                    value="87%"
                />

                <MetricCard
                    label="Braking"
                    value="79%"
                />

                <MetricCard
                    label="Gear Usage"
                    value="82%"
                />

                <MetricCard
                    label="Consistency"
                    value="85%"
                />

                </div>
            </section>

            {/* Recommendations */}
            <section className="rounded-xl border border-[#2e2e2e] p-5">
                <h3 className="mb-4 text-lg font-semibold text-white">
                Recommendations
                </h3>

                <ul className="space-y-2 text-gray-300">
                <li>
                    • Shift earlier to avoid RPM spikes.
                </li>

                <li>
                    • Maintain current throttle discipline.
                </li>

                <li>
                    • Monitor gear transitions during acceleration.
                </li>
                </ul>
            </section>

            </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-[#2e2e2e] p-4 sm:flex-row sm:justify-end">

            <button
              className="
                rounded-lg
                border
                border-[#2e2e2e]
                px-4
                py-2
                text-white
              "
            >
              Share Report
            </button>

            <button
              className="
                rounded-lg
                bg-red-600
                px-4
                py-2
                font-medium
                text-white
                hover:bg-red-700
              "
            >
              Download PDF
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#2e2e2e] p-4">
      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}