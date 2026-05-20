import { useEffect, useRef } from 'react';
import { useChat } from './hooks/useChat';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import WelcomeScreen from './components/WelcomeScreen';
import TelemetryDashboard from './components/TelemetryDashboard';
import ComparisonDashboard from './components/ComparisonDashboard';

export default function App() {
  const {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    uploadTelemetry,
    sessionId,
    summary,
    issues,
    comparisonResult,
    mode,
    setMode,
    uploadedCount,
    telemetry,
    metrics,
  } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f]">
      <Header onClear={clearMessages}
        hasMessages={
          messages.length > 0 ||
          !!sessionId ||
          !!comparisonResult
        } />

      <main className="flex-1 overflow-y-auto">
        {!sessionId || (mode === 'compare' && uploadedCount < 2) ? (
          <WelcomeScreen
            onUpload={uploadTelemetry}
            isLoading={isLoading}
            mode={mode}
            setMode={setMode}
            uploadedCount={uploadedCount}
          />
        ) : (
          <div className="max-w-3xl mx-auto py-6 px-4">
            {!comparisonResult && (
              <div className="mb-6 bg-[#161616] border border-[#2e2e2e] rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-white mb-3">
                Telemetry Analysis
              </h2>

              {summary && (
                <p className="text-gray-300 text-sm mb-4">
                  {summary}
                </p>
              )}

              {issues.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Detected Issues
                  </h3>

                  <ul className="space-y-2">
                    {issues.map((issue) => (
                      <li
                        key={issue}
                        className="text-sm text-gray-300 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg px-3 py-2"
                      >
                        • {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>)
            }

            {!comparisonResult && (
              <TelemetryDashboard
                telemetry={telemetry}
                metrics={metrics}
                issues={issues}
              />
            )}

            {comparisonResult && (
              <div className="mb-6 bg-[#161616] border border-[#2e2e2e] rounded-2xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Comparison Report
                </h2>

                <p className="text-gray-300 text-sm mb-4">
                  {comparisonResult.summary}
                </p>

                <div className="space-y-3">
                  <div className="bg-[#1f1f1f] rounded-lg p-3 text-gray-300 text-sm">
                    Braking Delta: {comparisonResult.comparison.avg_brake.delta_percent}%
                  </div>

                  <div className="bg-[#1f1f1f] rounded-lg p-3 text-gray-300 text-sm">
                    Throttle Delta: {comparisonResult.comparison.avg_throttle.delta_percent}%
                  </div>

                  <div className="bg-[#1f1f1f] rounded-lg p-3 text-gray-300 text-sm">
                    Steering Delta: {comparisonResult.comparison.avg_steering_change.delta_percent}%
                  </div>

                  <div className="bg-[#1f1f1f] rounded-lg p-3 text-gray-300 text-sm">
                    RPM Delta: {comparisonResult.comparison.high_rpm_ratio.delta_percent}%
                  </div>
                </div>
              </div>
            )}

            {comparisonResult && (
              <ComparisonDashboard
                comparisonResult={comparisonResult}
              />
            )}

            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {sessionId &&
        !(mode === 'compare' && uploadedCount < 2) && (
          <div className="max-w-3xl mx-auto w-full">
            <ChatInput
              onSend={sendMessage}
              isLoading={isLoading}
            />
          </div>
        )}
    </div>
  );
}