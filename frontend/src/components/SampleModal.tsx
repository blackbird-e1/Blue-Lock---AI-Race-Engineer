interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SampleModal({
  isOpen,
  onClose,
}: SampleModalProps) {
  if (!isOpen) return null;

  function downloadFile(
    path: string,
    filename: string
  ) {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadBoth() {
    downloadFile(
      '/samples/sample-telemetry-1.csv',
      'sample-telemetry-1.csv'
    );

    setTimeout(() => {
      downloadFile(
        '/samples/sample-telemetry-2.csv',
        'sample-telemetry-2.csv'
      );
    }, 400);
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full max-w-lg
          mx-4
          rounded-2xl
          border border-[#2e2e2e]
          bg-[#111111]
          p-8
          text-white
          shadow-2xl
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Sample Telemetry Data
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-white
              text-xl
            "
          >
            ✕
          </button>
        </div>

        <p className="text-gray-400 mb-8">
          Download demo telemetry CSVs for testing
          session analysis or driver comparison.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() =>
              downloadFile(
                '/samples/sample-telemetry-1.csv',
                'sample-telemetry-1.csv'
              )
            }
            className="
              block
              rounded-xl
              bg-[#161616]
              border border-[#2e2e2e]
              px-5 py-4
              hover:border-[#e10600]
              transition-all
              text-left
            "
          >
            Download Sample 1
          </button>

          <button
            onClick={() =>
              downloadFile(
                '/samples/sample-telemetry-2.csv',
                'sample-telemetry-2.csv'
              )
            }
            className="
              block
              rounded-xl
              bg-[#161616]
              border border-[#2e2e2e]
              px-5 py-4
              hover:border-[#2563eb]
              transition-all
              text-left
            "
          >
            Download Sample 2
          </button>

          <button
            onClick={downloadBoth}
            className="
              rounded-xl
              bg-[#e10600]
              px-5 py-4
              font-medium
              hover:bg-[#c90500]
              transition-all
            "
          >
            Download Both
          </button>
        </div>
      </div>
    </div>
  );
}