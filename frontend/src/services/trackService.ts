const API_URL = import.meta.env.VITE_API_URL;

export async function getTrackLayout(
    raceName: string
) {
  const response = await fetch(
    `${API_URL}/api/v1/track/layout?race=${raceName}`
  );

  if (!response.ok) {
    throw new Error("Failed to load track");
  }

  return response.json();
}