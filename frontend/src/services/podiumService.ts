export async function getPodium(
  race: string
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/calendar/podium?race=${encodeURIComponent(
      race
    )}`
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch podium'
    );
  }

  return response.json();
}