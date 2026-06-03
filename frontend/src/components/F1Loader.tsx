import { useEffect, useState } from 'react';

export default function F1Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 7);
    }, 600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-10">
        AI Race Engineer
        </h1>

        {step < 6 ? (
        <div className="flex gap-4">
            {[0, 1, 2, 3, 4].map((index) => (
            <div
                key={index}
                className={[
                'w-10 h-10 rounded-full transition-all duration-300',
                index < step
                    ? 'bg-red-600 shadow-[0_0_20px_rgba(225,6,0,0.8)]'
                    : 'bg-gray-800',
                ].join(' ')}
            />
            ))}
        </div>
        ) : (
        <div className="text-center">
            <p className="text-5xl font-bold text-red-500">
            LIGHTS OUT!
            </p>

            <p className="mt-4 text-gray-400">
            Race engineer online...
            </p>
        </div>
        )}
    </div>
    );
}