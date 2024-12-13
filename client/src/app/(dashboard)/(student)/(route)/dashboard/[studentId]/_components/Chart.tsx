"use client";

import { CartesianGrid, Legend, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CourseType } from "@/types/course";
const chartData = [
  { month: "January", "Kelas Diikuti": 4, "Kelas Selesai": 1 },
  { month: "February", "Kelas Diikuti": 2, "Kelas Selesai": 2 },
  { month: "March", "Kelas Diikuti": 7, "Kelas Selesai": 6 },
  { month: "April", "Kelas Diikuti": 1, "Kelas Selesai": 0 },
  { month: "May", "Kelas Diikuti": 2, "Kelas Selesai": 1 },
  { month: "June", "Kelas Diikuti": 3, "Kelas Selesai": 1 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Chart({ dataCourse }: { dataCourse: CourseType[] }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>kursus Diikuti dan Selesai</CardTitle>
        <CardDescription>Rata-Rata Perbulan</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend
              margin={{
                top: 12,
              }}
              iconType="circle"
              iconSize={8}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
            <Line
              dataKey="Kelas Diikuti"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Kelas Selesai"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex items-start w-full gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
