import { useEffect, useRef } from "react";
import { toPng } from "html-to-image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
};

export type Report = {
  overallAssessment: string;

  findings: {
    title: string;
    description: string;
    severity: "high" | "medium" | "low";
  }[];

  metrics: {
    throttle: number;
    braking: number;
    gearUsage: number;
    consistency: number;
  };

  recommendations: string[];
};

export default function ReportModal({
  isOpen,
  onClose,
  report,
}: Props) {

    const reportRef =
        useRef<HTMLDivElement>(null);

    const downloadImage = async () => {
        if (!reportRef.current) {
            return;
        }

        try {
            const dataUrl = await toPng(
            reportRef.current,
            {
                pixelRatio: 2,
                cacheBust: true,
            }
            );

            const link =
            document.createElement("a");

            link.download =
            "telemetry-report.png";

            link.href = dataUrl;

            link.click();
        } catch (error) {
            console.error(error);
        }
        };

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

  if (!isOpen || !report) {
    return null;
  }

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
            <div ref={reportRef} 
            className="bg-[#111111]
                min-h-full
                ">
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
                            {report.overallAssessment}
                        </p>
                    </section>

                    {/* Key Findings */}
                    <section className="rounded-xl border border-[#2e2e2e] p-5">
                        <h3 className="mb-4 text-lg font-semibold text-white">
                        Key Findings
                        </h3>

                        <div className="space-y-3">
                            {report.findings.length === 0 ? (
                                <p className="text-gray-400">
                                    No significant issues detected.
                                </p>
                                ) : (
                                    report.findings.map((finding) => (
                                <div
                                key={finding.title}
                                className="
                                    rounded-lg
                                    border
                                    border-red-500/20
                                    bg-red-500/10
                                    p-4
                                "
                                >
                                <p className="font-medium text-red-400">
                                    {finding.title}
                                </p>

                                <p className="mt-1 text-sm text-gray-300">
                                    {finding.description}
                                </p>
                                </div>
                            )))}
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
                            value={`${report.metrics.throttle}%`}
                        />

                        <MetricCard
                            label="Braking"
                            value={`${report.metrics.braking}%`}
                        />

                        <MetricCard
                            label="Gear Usage"
                            value={`${report.metrics.gearUsage}%`}
                        />

                        <MetricCard
                            label="Consistency"
                            value={`${report.metrics.consistency}%`}
                        />

                        </div>
                    </section>

                    {/* Recommendations */}
                    <section className="rounded-xl border border-[#2e2e2e] p-5">
                        <h3 className="mb-4 text-lg font-semibold text-white">
                        Recommendations
                        </h3>

                        <ul className="space-y-2 text-gray-300">
                                {report.recommendations.map(
                                    (recommendation) => (
                                    <li key={recommendation}>
                                        • {recommendation}
                                    </li>
                                    )
                                )}
                        </ul>
                    </section>

                    </div>
                </div>
                {/* Footer */}
                <div className="flex flex-col gap-3 border-t border-[#2e2e2e] p-4 sm:flex-row sm:justify-end">

                    {/* <button
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
                    </button> */}

                    <button
                        onClick={downloadImage}
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
                        Download Image
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