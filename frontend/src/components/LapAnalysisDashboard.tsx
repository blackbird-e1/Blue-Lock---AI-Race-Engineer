import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#161616] border border-[#2e2e2e] rounded-xl p-4">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-xl font-semibold text-white mt-2">{value}</p>
    </div>
  );
}

const lapComparisonData = [
  { time: 0, lapA: 180, lapB: 175 },
  { time: 10, lapA: 220, lapB: 210 },
  { time: 20, lapA: 250, lapB: 242 },
  { time: 30, lapA: 280, lapB: 268 },
  { time: 40, lapA: 190, lapB: 205 },
  { time: 50, lapA: 230, lapB: 220 },
  { time: 60, lapA: 295, lapB: 286 },
  { time: 70, lapA: 260, lapB: 250 },
  { time: 80, lapA: 210, lapB: 220 },
];

export default function LapAnalysisDashboard() {
  return (
    <div className="space-y-6 mb-8">
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Lap Intelligence Dashboard
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Fastest Lap" value="1:32.451" />
          <StatCard title="Avg Lap Time" value="1:34.210" />
          <StatCard title="Top Speed" value="312 km/h" />
          <StatCard title="Consistency" value="88%" />
        </div>
      </div>

      <div className="bg-[#161616] border border-[#2e2e2e] rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
          <h3 className="text-white font-medium">
            Lap Comparison
          </h3>

          <div className="flex items-center gap-3">
            <select className="bg-[#1f1f1f] border border-[#2e2e2e] rounded-lg px-3 py-2 text-sm text-white">
              <option>Fastest Lap</option>
              <option>Lap 2</option>
              <option>Lap 3</option>
            </select>

            <span className="text-gray-400 text-sm">vs</span>

            <select className="bg-[#1f1f1f] border border-[#2e2e2e] rounded-lg px-3 py-2 text-sm text-white">
              <option>Lap 4</option>
              <option>Lap 5</option>
              <option>Lap 6</option>
            </select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lapComparisonData}>
            <CartesianGrid stroke="#2a2a2a" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="lapA"
              stroke="#e10600"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="lapB"
              stroke="#3b82f6"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#161616] border border-[#2e2e2e] rounded-2xl p-5">
        <h3 className="text-white font-medium mb-4">
          AI Lap Insights
        </h3>

        <div className="space-y-3">
          <div className="text-sm text-gray-300 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg px-3 py-2">
            • Lost 0.38s under braking into Turn 3
          </div>

          <div className="text-sm text-gray-300 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg px-3 py-2">
            • Earlier throttle application possible in Sector 2
          </div>

          <div className="text-sm text-gray-300 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg px-3 py-2">
            • Steering consistency drops in technical sections
          </div>
        </div>
      </div>
    </div>
  );
}