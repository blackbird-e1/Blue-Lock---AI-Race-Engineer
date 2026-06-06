export async function getWcc() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/calendar/wcc`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch WDC');
  }

  return response.json();
}