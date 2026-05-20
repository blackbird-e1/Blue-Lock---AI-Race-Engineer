import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

import type {
  ComparisonResult,
  TelemetryPoint,
} from '../types';

interface ComparisonDashboardProps {
  comparisonResult: ComparisonResult;
}

function mergeTelemetry(
  telemetryA: TelemetryPoint[],
  telemetryB: TelemetryPoint[]
) {
  const maxLength = Math.max(
    telemetryA.length,
    telemetryB.length
  );

  return Array.from({ length: maxLength }, (_, i) => ({
    time:
      telemetryA[i]?.time ??
      telemetryB[i]?.time ??
      i,

    speedA: telemetryA[i]?.speed ?? null,
    speedB: telemetryB[i]?.speed ?? null,

    throttleA: telemetryA[i]?.throttle ?? null,
    throttleB: telemetryB[i]?.throttle ?? null,

    brakeA: telemetryA[i]?.brake ?? null,
    brakeB: telemetryB[i]?.brake ?? null,

    steeringA: telemetryA[i]?.steering ?? null,
    steeringB: telemetryB[i]?.steering ?? null,

    gearA: telemetryA[i]?.gear ?? null,
    gearB: telemetryB[i]?.gear ?? null,
  }));
}

function MetricCard({
  title,
  delta,
}: {
  title: string;
  delta: number;
}) {
  const positive = delta > 0;

  return (
    <div className="bg-[#161616] border border-[#2e2e2e] rounded-xl p-4">
      <p className="text-xs text-gray-400">{title}</p>
      <p
        className={[
          'text-xl font-semibold mt-2',
          positive ? 'text-red-400' : 'text-green-400',
        ].join(' ')}
      >
        {delta}%
      </p>
    </div>
  );
}

export default function ComparisonDashboard({
  comparisonResult,
}: ComparisonDashboardProps) {
  const mergedData = mergeTelemetry(
    comparisonResult.telemetry_a,
    comparisonResult.telemetry_b
  );

  return (
    <div className="space-y-6 mb-8">
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Driver Comparison Dashboard
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            title="Brake Delta"
            delta={comparisonResult.comparison.avg_brake.delta_percent}
          />

          <MetricCard
            title="Throttle Delta"
            delta={comparisonResult.comparison.avg_throttle.delta_percent}
          />

          <MetricCard
            title="Steering Delta"
            delta={
              comparisonResult.comparison
                .avg_steering_change.delta_percent
            }
          />

          <MetricCard
            title="RPM Delta"
            delta={
              comparisonResult.comparison
                .high_rpm_ratio.delta_percent
            }
          />
        </div>
      </div>

      <div className="bg-[#161616] border border-[#2e2e2e] rounded-2xl p-5">
        <h3 className="text-white font-medium mb-4">
          Speed Comparison
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mergedData}>
            <CartesianGrid stroke="#2a2a2a" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="speedA"
              name="Driver A"
              stroke="#e10600"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="speedB"
              name="Driver B"
              stroke="#3b82f6"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#161616] border border-[#2e2e2e] rounded-2xl p-5">
        <h3 className="text-white font-medium mb-4">
          Throttle / Brake Comparison
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mergedData}>
            <CartesianGrid stroke="#2a2a2a" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="throttleA"
              name="Throttle A"
              stroke="#22c55e"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="throttleB"
              name="Throttle B"
              stroke="#86efac"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="brakeA"
              name="Brake A"
              stroke="#ef4444"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="brakeB"
              name="Brake B"
              stroke="#fca5a5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#161616] border border-[#2e2e2e] rounded-2xl p-5">
        <h3 className="text-white font-medium mb-4">
          Steering Comparison
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mergedData}>
            <CartesianGrid stroke="#2a2a2a" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="steeringA"
              name="Driver A"
              stroke="#f59e0b"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="steeringB"
              name="Driver B"
              stroke="#fde68a"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#161616] border border-[#2e2e2e] rounded-2xl p-5">
        <h3 className="text-white font-medium mb-4">
          Gear Timeline Comparison
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mergedData}>
            <CartesianGrid stroke="#2a2a2a" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Legend />
            <Line
              type="stepAfter"
              dataKey="gearA"
              name="Driver A"
              stroke="#a855f7"
              dot={false}
            />
            <Line
              type="stepAfter"
              dataKey="gearB"
              name="Driver B"
              stroke="#d8b4fe"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}