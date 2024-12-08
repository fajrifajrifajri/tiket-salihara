import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Line, LineChart, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type BarChartData = {
    month: string;
    desktop: number;
    mobile: number;
};

type LineChartData = {
    bulan: string;
    pendapatan: number;
};

type BarChartProps = {
    data: BarChartData[];
    config: ChartConfig;
};

type LineChartProps = {
    data: LineChartData[];
    config: ChartConfig;
};

export function BarChartComponent({ data, config }: BarChartProps) {
    return (
        <ChartContainer config={config} className="h-[400px] w-full">
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}

export function LineChartComponent({ data, config }: LineChartProps) {
    return (
        <ChartContainer config={config} className="h-[400px] w-full">
            <LineChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="bulan"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                    type="monotone"
                    dataKey="pendapatan"
                    stroke="var(--color-pendapatan)"
                    strokeWidth={2}
                />
            </LineChart>
        </ChartContainer>
    );
}
