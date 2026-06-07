const API_URL = import.meta.env.VITE_API_URL;

export async function getLeaderboard(
  raceName: string
) {
  const response = await fetch(
    `${API_URL}/api/v1/leaderboard/?race=${raceName}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load leaderboard"
    );
  }

  return response.json();
}