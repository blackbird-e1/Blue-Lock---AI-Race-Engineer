import { useRef } from 'react';

interface WelcomeScreenProps {
  onUpload: (file: File) => Promise<unknown>;
  isLoading: boolean;
}

export default function WelcomeScreen({
  onUpload,
  isLoading,
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

      <div className="w-full max-w-md">
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => inputRef.current?.click()}
          disabled={isLoading}
          className="w-full bg-[#e10600] hover:bg-[#b30500] disabled:bg-[#3a1a1a] text-white font-medium py-4 rounded-2xl transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading
            ? 'Uploading telemetry...'
            : 'Upload Telemetry CSV'}
        </button>
      </div>

      <div className="mt-10 max-w-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl px-4 py-3 text-sm text-gray-400">
            Analyze braking performance
          </div>

          <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl px-4 py-3 text-sm text-gray-400">
            Detect steering instability
          </div>

          <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl px-4 py-3 text-sm text-gray-400">
            Evaluate throttle usage
          </div>

          <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl px-4 py-3 text-sm text-gray-400">
            Get AI race coaching feedback
          </div>
        </div>
      </div>
    </div>
  );
}