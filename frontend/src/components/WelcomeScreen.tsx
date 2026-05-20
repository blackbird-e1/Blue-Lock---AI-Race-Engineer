import { useRef } from 'react';
import TelemetryHeroAnimation from "./TelemetryHeroAnimation";

interface WelcomeScreenProps {
  onUpload: (file: File) => Promise<unknown>;
  isLoading: boolean;
  mode: 'single' | 'compare' | null;
  setMode: (mode: 'single' | 'compare') => void;
  uploadedCount: number;
}

export default function WelcomeScreen({
  onUpload,
  isLoading,
  mode,
  setMode,
  uploadedCount,
}: WelcomeScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      await onUpload(file);
    } catch (err) {
      console.error(err);

      alert(
        err instanceof Error
          ? err.message
          : 'Upload failed.'
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
      <div className="mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1.5 h-10 bg-[#e10600] rounded-sm" />

          <span className="text-white font-bold text-4xl tracking-tight">
            F1
          </span>

          <div className="w-1.5 h-10 bg-[#e10600] rounded-sm" />
        </div>

        <h1 className="text-3xl font-semibold text-white mb-3">
          AI Race Engineer
        </h1>

        <p className="text-gray-500 text-sm max-w-md">
          Upload telemetry CSV data and receive
          AI-powered race coaching insights.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">
        <button
          onClick={() => {
            setMode('single');
            inputRef.current?.click();
          }}
          disabled={isLoading}
          className="bg-[#161616] border border-[#2e2e2e] hover:border-[#e10600] rounded-2xl p-6 text-left transition-all"
        >
          <h2 className="text-white text-xl font-semibold mb-2">
            Analyze Session
          </h2>

          <p className="text-gray-400 text-sm">
            Upload a single telemetry CSV and
            receive AI race coaching insights.
          </p>
        </button>

        <button
          onClick={() => {
            setMode('compare');

            if (uploadedCount < 2) {
              inputRef.current?.click();
            }
          }}
          disabled={isLoading}
          className="bg-[#161616] border border-[#2e2e2e] hover:border-[#2563eb] rounded-2xl p-6 text-left transition-all"
        >
          <h2 className="text-white text-xl font-semibold mb-2">
            Compare Drivers
          </h2>

          <p className="text-gray-400 text-sm">
            Upload two telemetry sessions and compare
            driver performance side-by-side.
          </p>
        </button>
      </div>

      {mode && (
        <p className="mt-6 text-sm text-gray-500">
          {isLoading
            ? 'Uploading telemetry...'
            : mode === 'single'
            ? 'Single session analysis selected.'
            : uploadedCount === 0
            ? 'Upload first telemetry session.'
            : uploadedCount === 1
            ? 'Upload second telemetry session.'
            : 'Comparison complete.'}
        </p>
      )}

      <TelemetryHeroAnimation />
    </div>
  );
}