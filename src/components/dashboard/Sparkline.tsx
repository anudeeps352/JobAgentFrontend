import { LineChart, Line, ResponsiveContainer } from 'recharts';

const colorMap = {
  purple: 'var(--primary)',
  green: '#22c55e',
  red: '#ef4444',
} as const;

interface SparklineProps {
  data: number[];
  color: keyof typeof colorMap;
}

export function Sparkline({ data, color }: SparklineProps) {
  const chartData = data.map((value, index) => ({ i: index, v: value }));
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={colorMap[color]}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
