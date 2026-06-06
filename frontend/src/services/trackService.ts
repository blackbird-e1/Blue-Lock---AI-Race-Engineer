const API_URL = import.meta.env.VITE_API_URL;

export async function getTrackLayout() {
  const response = await fetch(
    `${API_URL}/api/v1/track/layout`
  );

  if (!response.ok) {
    throw new Error("Failed to load track");
  }

  return response.json();
}