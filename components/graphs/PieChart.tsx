'use client';

import { Card } from '@/components/ui/card';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { chartConfig } from '@/lib/chart-config';

interface DataPoint {
  name: string;
  value: number;
}

interface PieChartResult {
  data: DataPoint[];
  title?: string;
}

interface PieChartProps {
  result?: PieChartResult;
}

const DEFAULT_DATA: DataPoint[] = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 200 },
  { name: 'Category D', value: 100 },
];

export function PieChart({ result }: PieChartProps) {
  const { colors, height } = chartConfig.pieChart;
  const { data = DEFAULT_DATA, title = 'Sample Pie Chart' } = result || {};

  return (
    <Card className="p-4">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 