import { useState, useCallback } from 'react';
import { uploadTelemetryFile } from '../services/telemetryService';

import type {
  ComparisonResult,
  TelemetryMetrics,
  TelemetryPoint,
} from '../types';

export function useTelemetryUpload() {
  const [isUploading, setIsUploading] =
    useState(false);

  const [sessionId, setSessionId] =
    useState<string | null>(null);

  const [baselineSessionId, setBaselineSessionId] =
    useState<string | null>(null);

  const [summary, setSummary] =
    useState<string | null>(null);

  const [issues, setIssues] =
    useState<string[]>([]);

  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);

  const [mode, setMode] =
    useState<'single' | 'compare' | null>(null);

  const [uploadedCount, setUploadedCount] =
    useState(0);

  const [telemetry, setTelemetry] =
    useState<TelemetryPoint[]>([]);

  const [metrics, setMetrics] =
    useState<TelemetryMetrics | null>(null);

  const resetTelemetry = useCallback(() => {
        setSessionId(null);
        setBaselineSessionId(null);
        setSummary(null);
        setIssues([]);
        setComparisonResult(null);
        setMode(null);
        setUploadedCount(0);
        setTelemetry([]);
        setMetrics(null);
        setIsUploading(false);
    }, []);

  const uploadTelemetry = useCallback(
    async (file: File) => {
      if (!mode) {
        throw new Error('Please select a mode first.');
      }

      if (mode === 'single' && uploadedCount >= 1) {
        throw new Error(
          'Single analysis allows only one file.'
        );
      }

      if (mode === 'compare' && uploadedCount >= 2) {
        throw new Error(
          'Comparison allows only two files.'
        );
      }

      try {
        // SINGLE MODE
        if (mode === 'single') {
          setIsUploading(true);

          const data = await uploadTelemetryFile(file);

          if (import.meta.env.DEV) {
            await new Promise((resolve) => {
              setTimeout(resolve, 8000);
            });
          }

          setSessionId(data.session_id);
          setSummary(data.summary);
          setIssues(data.issues_detected);
          setUploadedCount(1);
          setTelemetry(data.telemetry);
          setMetrics(data.metrics);

          localStorage.setItem(
            "lastAnalysis",
            JSON.stringify({
              sessionId: data.session_id,
              summary: data.summary,
              issues: data.issues_detected,
              timestamp: Date.now(),
            })
          );

          return data;
        }

        // COMPARE MODE FIRST FILE
        if (mode === 'compare' && uploadedCount === 0) {
          const data = await uploadTelemetryFile(file);

          setBaselineSessionId(data.session_id);
          setSessionId(data.session_id);
          setSummary(data.summary);
          setIssues(data.issues_detected);
          setUploadedCount(1);
          setTelemetry(data.telemetry);
          setMetrics(data.metrics);

          return data;
        }

        // COMPARE MODE SECOND FILE
        if (
          mode === 'compare' &&
          uploadedCount === 1 &&
          baselineSessionId
        ) {
          setIsUploading(true);

          const data = await uploadTelemetryFile(file);

          if (import.meta.env.DEV) {
            await new Promise((resolve) => {
              setTimeout(resolve, 8000);
            });
          }

          const compareResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/compare`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                session_a: baselineSessionId,
                session_b: data.session_id,
              }),
            }
          );

          if (!compareResponse.ok) {
            const err = await compareResponse.json();
            throw new Error(
              err.detail || 'Comparison failed'
            );
          }

          const compareData: ComparisonResult =
            await compareResponse.json();

          setComparisonResult(compareData);
          setUploadedCount(2);

          return compareData;
        }
      } finally {
        setIsUploading(false);
      }
    },
    [mode, uploadedCount, baselineSessionId]
  );

  return {
        uploadTelemetry,
        resetTelemetry,

        isUploading,

        sessionId,
        baselineSessionId,

        summary,
        issues,

        comparisonResult,

        mode,
        setMode,

        uploadedCount,

        telemetry,
        metrics,
    };
}