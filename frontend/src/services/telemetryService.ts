import type { UploadResponse } from '../types';
import type { NextRace } from '../types';

export async function getNextRace(): Promise<NextRace> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/next-race`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch next race');
  }

  return response.json();
}

export async function uploadTelemetryFile(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Upload failed');
  }

  return response.json();
}