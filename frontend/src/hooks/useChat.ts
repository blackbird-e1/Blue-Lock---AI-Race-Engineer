// import { useState, useCallback } from 'react';
// import type { Message } from '../types';

// function generateId(): string {
//   return Math.random().toString(36).slice(2, 11);
// }

// interface UploadResponse {
//   session_id: string;
//   rows_processed: number;
//   issues_detected: string[];
//   summary: string;
// }

// export function useChat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [summary, setSummary] = useState<string | null>(null);
//   const [issues, setIssues] = useState<string[]>([]);

//   const uploadTelemetry = useCallback(async (file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.detail || 'Upload failed');
//       }

//       const data: UploadResponse = await response.json();

//       setSessionId(data.session_id);
//       setSummary(data.summary);
//       setIssues(data.issues_detected);

//       return data;
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const sendMessage = useCallback(async (content: string) => {
//     if (!sessionId || !content.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: generateId(),
//       role: 'user',
//       content,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/chat`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           message: content,
//         }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.detail || 'Chat failed');
//       }

//       const data = await response.json();

//       const assistantMessage: Message = {
//         id: generateId(),
//         role: 'assistant',
//         content: data.answer,
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (err) {
//       const errorMessage: Message = {
//         id: generateId(),
//         role: 'assistant',
//         content:
//           err instanceof Error
//             ? err.message
//             : 'Something went wrong.',
//         timestamp: new Date(),
//         error: true,
//       };

//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [sessionId, isLoading]);

//   const clearMessages = useCallback(() => {
//     setMessages([]);
//     setSessionId(null);
//     setSummary(null);
//     setIssues([]);
//   }, []);

//   return {
//     messages,
//     isLoading,
//     sendMessage,
//     clearMessages,
//     uploadTelemetry,
//     sessionId,
//     summary,
//     issues,
//   };
// }

import { useState, useCallback } from 'react';
import type { Message } from '../types';

function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

interface UploadResponse {
  session_id: string;
  rows_processed: number;
  issues_detected: string[];
  summary: string;
}

interface ComparisonResult {
  summary: string;
  comparison: {
    avg_brake: {
      baseline: number;
      compared: number;
      delta_percent: number;
    };
    avg_throttle: {
      baseline: number;
      compared: number;
      delta_percent: number;
    };
    avg_steering_change: {
      baseline: number;
      compared: number;
      delta_percent: number;
    };
    high_rpm_ratio: {
      baseline: number;
      compared: number;
      delta_percent: number;
    };
  };
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [baselineSessionId, setBaselineSessionId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);
  const [isCompareMode, setIsCompareMode] = useState(false);

  const uploadTelemetry = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Upload failed');
      }

      const data: UploadResponse = await response.json();

      if (!baselineSessionId) {
        setBaselineSessionId(data.session_id);
        setSessionId(data.session_id);
        setSummary(data.summary);
        setIssues(data.issues_detected);
        return data;
      }

      if (isCompareMode && baselineSessionId) {
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
          throw new Error(err.detail || 'Comparison failed');
        }

        const compareData: ComparisonResult =
          await compareResponse.json();

        setComparisonResult(compareData);
        setIsCompareMode(false);
      }

      return data;
    } finally {
      setIsLoading(false);
    }
  }, [baselineSessionId, isCompareMode]);

  const startComparison = useCallback(() => {
    setIsCompareMode(true);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!sessionId || !content.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const finalMessage = comparisonResult
        ? `
      Comparison context:
      ${comparisonResult.summary}

      Braking delta: ${comparisonResult.comparison.avg_brake.delta_percent}%
      Throttle delta: ${comparisonResult.comparison.avg_throttle.delta_percent}%
      Steering delta: ${comparisonResult.comparison.avg_steering_change.delta_percent}%
      RPM delta: ${comparisonResult.comparison.high_rpm_ratio.delta_percent}%

      User question: ${content}
      `
        : content;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: finalMessage,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Chat failed');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content:
          err instanceof Error
            ? err.message
            : 'Something went wrong.',
        timestamp: new Date(),
        error: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isLoading, comparisonResult]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    setBaselineSessionId(null);
    setSummary(null);
    setIssues([]);
    setComparisonResult(null);
    setIsCompareMode(false);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    uploadTelemetry,
    sessionId,
    summary,
    issues,
    comparisonResult,
    startComparison,
    isCompareMode,
  };
}