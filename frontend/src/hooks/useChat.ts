import { useState, useCallback } from 'react';
import type {
  Message,
  ComparisonResult,
} from '../types';

import { generateId } from '../utils/generateId';

interface UseChatProps {
  sessionId: string | null;
  comparisonResult: ComparisonResult | null;
}

export function useChat({
  sessionId,
  comparisonResult,
}: UseChatProps) {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!sessionId || !content.trim() || isLoading)
        return;

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

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

        User question: ${content}`
          : content;
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              session_id: sessionId,
              message: finalMessage,
            }),
          }
        );

        if (!response.ok) {
          const err = await response.json();

          throw new Error(
            err.detail || 'Chat failed'
          );
        }

        const data = await response.json();

        const assistantMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: data.answer,
          timestamp: new Date(),
        };

        setMessages((prev) => [
          ...prev,
          assistantMessage,
        ]);
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

        setMessages((prev) => [
          ...prev,
          errorMessage,
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, comparisonResult, isLoading]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}