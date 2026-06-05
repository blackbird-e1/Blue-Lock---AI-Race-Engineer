export async function getCalendar() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/calendar`
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch calendar'
    );
  }

  return response.json();
}