import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useUser,
  SignOutButton,
} from "@clerk/clerk-react";
import { getDrivers } from "../services/driverService";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [selectedDriver, setSelectedDriver] = useState("");
  const [drivers, setDrivers] = useState<string[]>([]);

  useEffect(() => {
    const savedDriver =
      localStorage.getItem("favoriteDriver");

    if (savedDriver) {
      setSelectedDriver(savedDriver);
    }
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

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <button
        onClick={() => navigate("/")}
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

      <div className="mb-10 flex items-center gap-4">
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
          <h2 className="text-xl font-semibold">
            {user?.fullName}
          </h2>

          <p className="text-gray-400 text-sm">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <div className="border-b border-[#2e2e2e] mb-8" />

      <h1 className="text-4xl font-bold mb-8">
        Favorite Driver
      </h1>

      {selectedDriver && (
        <div className="mb-6 text-gray-300">
          Selected Driver:
          <span className="ml-2 text-white font-semibold">
            {selectedDriver}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {drivers.map((driver) => (
          <div
            key={driver}
            onClick={() =>
              setSelectedDriver(driver)
            }
            className={[
              "p-4",
              "rounded-xl",
              "border",
              "cursor-pointer",
              "transition-all",
              selectedDriver === driver
                ? "border-[#e10600] bg-[#1f1f1f]"
                : "border-[#2e2e2e] bg-[#161616]",
            ].join(" ")}
          >
            {driver}
          </div>
        ))}
      </div>

      <SignOutButton>
        <button
          className="
            mt-10
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
  );
}