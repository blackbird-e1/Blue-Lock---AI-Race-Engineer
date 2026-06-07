const API_URL = import.meta.env.VITE_API_URL;

export async function getDrivers(
  raceName: string
) {
  const response = await fetch(
    `${API_URL}/api/v1/drivers?race=${raceName}`
  );

  if (!response.ok) {
    throw new Error("Failed to load drivers");
  }

  return response.json();
}