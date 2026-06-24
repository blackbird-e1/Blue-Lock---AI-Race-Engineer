import { useEffect, useRef, useState } from 'react';
import { useChat } from '../hooks/useChat';
import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import WelcomeScreen from '../components/WelcomeScreen';
import TelemetryDashboard from '../components/TelemetryDashboard';
import ComparisonDashboard from '../components/ComparisonDashboard';
import LapAnalysisDashboard from '../components/LapAnalysisDashboard';
// import { useTheme } from '../hooks/useTheme';
import { useTelemetryUpload } from '../hooks/useTelemetryUpload';
import RaceCountdownWidget from '../components/RaceCountdownWidget';
import { SignedIn } from "@clerk/clerk-react";
import CalendarSidebar from "../components/CalendarSidebar";
import ProfileView from "../components/ProfileView";
// import { getDrivers } from '../services/driverService';

export default function HomePage() {
  
  const telemetryUpload = useTelemetryUpload();
  const {
    uploadTelemetry,
    resetTelemetry,
    isUploading,
    sessionId,
    summary,
    issues,
    comparisonResult,
    mode,
    setMode,
    uploadedCount,
    telemetry,
    metrics,
  } = telemetryUpload;
  
  const {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  } = useChat({
    sessionId,
    comparisonResult,
  });

  const handleClear = () => {
    clearMessages();
    resetTelemetry();
  };

  const bottomRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'laps'>(
  'telemetry');
  // const { theme, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState<
    "analysis" | "profile"
  >("analysis");
  // const [drivers, setDrivers] = useState<
  //   string[]
  // >([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // useEffect(() => {
  //   async function preloadDrivers() {
  //     try {
  //       const data = await getDrivers(
  //         "Monaco Grand Prix"
  //       );

  //       setDrivers(data.drivers);
  //     } catch (error) {
  //       console.error(
  //         "Failed to preload drivers",
  //         error
  //       );
  //     }
  //   }

  //   preloadDrivers();
  // }, []);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0f0f0f]">
        <Header
          onClear={handleClear}
          hasMessages={
            messages.length > 0 ||
            !!sessionId ||
            !!comparisonResult
          }
          // theme={theme}
          // toggleTheme={toggleTheme}
          onProfileClick={() =>
            setActiveView("profile")
          }
        />

      <main className="flex-1 overflow-y-auto">
        

        {activeView === "analysis" && (
          <>
            {!sessionId || (mode === 'compare' && uploadedCount < 2) ? (
          <WelcomeScreen
            onUpload={uploadTelemetry}
            isLoading={isUploading}
            // mode={mode}
            setMode={setMode}
            uploadedCount={uploadedCount}
          />
        ) : (
          <div className="max-w-3xl mx-auto py-6 px-4">
            {!comparisonResult && (
              <div className="mb-6 bg-white dark:bg-[#161616] border border-gray-300 dark:border-[#2e2e2e] rounded-2xl p-5 shadow-md dark:shadow-none">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-3">
                Telemetry Analysis
              </h2>

              {summary && (
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {summary}
                </p>
              )}

              {issues.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Detected Issues
                  </h3>

                  <ul className="space-y-2">
                    {issues.map((issue) => (
                      <li
                        key={issue}
                        className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#1f1f1f] border border-gray-300 dark:border-[#2a2a2a] rounded-lg px-3 py-2"
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
              <>
                <div className="mb-6">
                  <div className="inline-flex bg-gray-100 dark:bg-[#161616] border border-gray-300 dark:border-[#2e2e2e] rounded-xl p-1">
                    <button
                      onClick={() => setActiveTab('telemetry')}
                      className={[
                        'px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer',
                        activeTab === 'telemetry'
                          ? 'bg-white dark:bg-[#2a2a2a] text-black dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white',
                      ].join(' ')}
                    >
                      Telemetry Analysis
                    </button>

                    <button
                      onClick={() => setActiveTab('laps')}
                      className={[
                        'px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer',
                        activeTab === 'laps'
                          ? 'bg-white dark:bg-[#2a2a2a] text-black dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white',
                      ].join(' ')}
                    >
                      Lap Analysis ✨
                    </button>
                  </div>
                </div>

                {activeTab === 'telemetry' && (
                  <TelemetryDashboard
                    telemetry={telemetry}
                    metrics={metrics}
                    issues={issues}
                  />
                )}

                {activeTab === 'laps' && sessionId && (
                  <LapAnalysisDashboard
                    sessionId={sessionId}
                  />
                )}
              </>
            )}

            {comparisonResult && (
              <div className="
                mb-6
                bg-white
                dark:bg-[#161616]
                border
                border-gray-300
                dark:border-[#2e2e2e]
                rounded-2xl
                p-5
              ">
                <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Comparison Report
                </h2>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {comparisonResult.summary}
                </p>

                <div className="space-y-3">
                  <div className="
                    bg-gray-100
                    dark:bg-[#1f1f1f]
                    border
                    border-gray-300
                    dark:border-[#2a2a2a]
                    rounded-lg
                    p-3
                    text-gray-700
                    dark:text-gray-300
                    text-sm
                  ">
                    Braking Delta: {comparisonResult.comparison.avg_brake.delta_percent}%
                  </div>

                  <div className="
                    bg-gray-100
                    dark:bg-[#1f1f1f]
                    border
                    border-gray-300
                    dark:border-[#2a2a2a]
                    rounded-lg
                    p-3
                    text-gray-700
                    dark:text-gray-300
                    text-sm
                  ">
                    Throttle Delta: {comparisonResult.comparison.avg_throttle.delta_percent}%
                  </div>

                  <div className="
                    bg-gray-100
                    dark:bg-[#1f1f1f]
                    border
                    border-gray-300
                    dark:border-[#2a2a2a]
                    rounded-lg
                    p-3
                    text-gray-700
                    dark:text-gray-300
                    text-sm
                  ">
                    Steering Delta: {comparisonResult.comparison.avg_steering_change.delta_percent}%
                  </div>

                  <div className="
                    bg-gray-100
                    dark:bg-[#1f1f1f]
                    border
                    border-gray-300
                    dark:border-[#2a2a2a]
                    rounded-lg
                    p-3
                    text-gray-700
                    dark:text-gray-300
                    text-sm
                  ">
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
          </>
        )}

        {activeView === "profile" && (
          <ProfileView
            onBack={() =>
              setActiveView("analysis")
            }
            // drivers={drivers}
          />
        )}
      </main>

      {activeView === "analysis" &&
        sessionId &&
        !(mode === 'compare' && uploadedCount < 2) && (
          <div className="max-w-3xl mx-auto w-full">
            <ChatInput
              onSend={sendMessage}
              isLoading={isLoading}
            />
          </div>
      )}

      <RaceCountdownWidget />

      <SignedIn>
        <CalendarSidebar />
      </SignedIn>
    </div>
  );
}