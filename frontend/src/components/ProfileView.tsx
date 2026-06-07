import { useState, useEffect } from "react";
import {
  useUser,
  SignOutButton,
} from "@clerk/clerk-react";
import { getDrivers } from "../services/driverService";
import type { LastAnalysis } from "../types";

type Props = {
  onBack: () => void;
};

export default function ProfilePage({
  onBack,
}: Props) {
  const { user } = useUser();

  const [selectedDriver, setSelectedDriver] =
    useState("");

  const [drivers, setDrivers] = useState<
    string[]
  >([]);

  const [lastAnalysis, setLastAnalysis] =
    useState<LastAnalysis | null>(null);

  useEffect(() => {
    const savedDriver =
      localStorage.getItem("favoriteDriver");

    if (savedDriver) {
      setSelectedDriver(savedDriver);
    }

    async function loadDrivers() {
      try {
        const data = await getDrivers(
          "Monaco Grand Prix"
        );

        setDrivers(data.drivers);
      } catch (error) {
        console.error(
          "Failed to load drivers",
          error
        );
      }
    }

    loadDrivers();
  }, []);

  useEffect(() => {
    if (selectedDriver) {
      localStorage.setItem(
        "favoriteDriver",
        selectedDriver
      );
    }
  }, [selectedDriver]);

  useEffect(() => {
    const saved =
      localStorage.getItem("lastAnalysis");

    if (saved) {
      try {
        setLastAnalysis(JSON.parse(saved));
      } catch (error) {
        console.error(
          "Failed to parse last analysis",
          error
        );
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
        <div className="max-w-4xl mx-auto p-8">
        <button
            onClick={onBack}
            className="
            mb-8
            px-4
            py-2
            rounded-lg
            border
            border-[#2e2e2e]
            hover:bg-[#1a1a1a]
            transition-colors
            cursor-pointer
            "
        >
            ← Back
        </button>

        {/* Profile Card */}

        <div
            className="
            mb-8
            p-6
            rounded-2xl
            border
            border-[#2e2e2e]
            bg-[#161616]
            "
        >
            <div className="flex items-center gap-4">
            <img
                src={user?.imageUrl}
                alt="Profile"
                className="
                w-16
                h-16
                rounded-full
                border
                border-[#2e2e2e]
                "
            />

            <div>
                <h2 className="text-2xl font-semibold">
                {user?.fullName}
                </h2>
            </div>
            </div>
        </div>

        {/* Favorite Driver */}

        <div
            className="
            mb-8
            p-6
            rounded-2xl
            border
            border-[#2e2e2e]
            bg-[#161616]
            "
        >
            <h2 className="text-xl font-bold mb-2">
            Favorite Driver
            </h2>

            <p className="text-sm text-gray-400 mb-4">
            Select your preferred driver
            </p>

            <select
            value={selectedDriver}
            onChange={(e) =>
                setSelectedDriver(e.target.value)
            }
            className="
                w-72
                p-3
                rounded-lg
                bg-[#0f0f0f]
                border
                border-[#2e2e2e]
                text-white
                outline-none
                cursor-pointer
            "
            >
            <option value="">
                Select Driver
            </option>

            {drivers.map((driver) => (
                <option
                key={driver}
                value={driver}
                >
                {driver}
                </option>
            ))}
            </select>
        </div>

        {/* Last Analysis */}

        {lastAnalysis && (
            <div
            className="
                mb-8
                p-6
                rounded-2xl
                border
                border-[#2e2e2e]
                bg-[#161616]
            "
            >
            <h2 className="text-xl font-bold mb-4">
                Last Analysis
            </h2>

            <p className="text-sm text-gray-400 mb-2">
                {new Date(
                lastAnalysis.timestamp
                ).toLocaleString()}
            </p>

            <p className="text-sm text-gray-400 mb-2">
                Analysis ID:{" "}
                {lastAnalysis.sessionId.slice(0, 8)}
            </p>

            <p className="text-sm text-gray-400 mb-4">
                Issues Found:{" "}
                {lastAnalysis.issues.length}
            </p>

            <p className="mb-4">
                {lastAnalysis.summary}
            </p>

            <div className="space-y-2">
                {lastAnalysis.issues.map(
                (issue) => (
                    <div key={issue}>
                    • {issue}
                    </div>
                )
                )}
            </div>

            <button
                className="
                mt-6
                px-4
                py-2
                rounded-lg
                bg-[#e10600]
                hover:bg-[#c90500]
                transition-colors
                cursor-pointer
                "
            >
                View Report
            </button>
            </div>
        )}

        <SignOutButton>
            <button
            className="
                px-4
                py-2
                rounded-lg
                border
                border-[#e10600]
                text-red-500
                hover:bg-[#1a1a1a]
                transition-colors
                cursor-pointer
            "
            >
            Sign Out
            </button>
        </SignOutButton>
        </div>
    </div>
    );
}