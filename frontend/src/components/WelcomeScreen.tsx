import TelemetryHeroAnimation from "./TelemetryHeroAnimation";
import { useRef, useState } from 'react';
import AboutModal from './AboutModal';
import SampleModal from './SampleModal';
import F1Loader from './F1Loader';
import RaceCountdownWidget from './RaceCountdownWidget';

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

  if (isLoading) {
    return <F1Loader />;
  }
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showSample, setShowSample] = useState(false);

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

          <span className="text-black dark:text-white font-bold text-4xl tracking-tight">
            F1
          </span>

          <div className="w-1.5 h-10 bg-[#e10600] rounded-sm" />
        </div>

        <h1 className="text-3xl font-semibold text-black dark:text-white mb-3">
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
          className="
            bg-white
            dark:bg-[#161616]
            border
            border-gray-300
            dark:border-[#2e2e2e]
            hover:border-[#e10600]
            rounded-2xl
            p-6
            text-left
            transition-all
            "
        >
          <h2 className="text-black dark:text-white text-xl font-semibold mb-2">
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
          className="
          bg-white
          dark:bg-[#161616]
          border
          border-gray-300
          dark:border-[#2e2e2e]
          hover:border-[#2563eb]
          rounded-2xl
          p-6
          text-left
          transition-all
          "
        >
          <h2 className="text-black dark:text-white text-xl font-semibold mb-2">
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
            ? '✓ Driver A telemetry uploaded. Upload Driver B telemetry to start comparison.'
            : 'Comparison complete.'}
        </p>
      )}

      <div className="mt-10 flex flex-col items-center gap-6">
        <TelemetryHeroAnimation />

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            onClick={() => setShowAbout(true)}
            className="
              px-8
              py-3
              rounded-full
              bg-[#e10600]
              text-white
              font-medium
              shadow-[0_0_20px_rgba(225,6,0,0.35)]
              hover:bg-[#c90500]
              hover:shadow-[0_0_28px_rgba(225,6,0,0.5)]
              hover:-translate-y-0.5
              transition-all
              duration-300
            "
          >
            About Us
          </button>

          <button
            onClick={() => setShowSample(true)}
            className="
              px-8
              py-3
              rounded-full
              bg-[#2563eb]
              text-white
              font-medium
              shadow-[0_0_20px_rgba(37,99,235,0.35)]
              hover:bg-[#1d4ed8]
              hover:shadow-[0_0_28px_rgba(37,99,235,0.5)]
              hover:-translate-y-0.5
              transition-all
              duration-300
            "
          >
            Sample
          </button>
        </div>
      </div>

      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />

      <SampleModal
        isOpen={showSample}
        onClose={() => setShowSample(false)}
      />

      <RaceCountdownWidget />
    </div>
  );
}