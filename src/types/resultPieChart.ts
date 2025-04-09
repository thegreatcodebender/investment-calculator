export interface ResultPieChartProps {
  pieData: {
    title: string;
    value: number;
    valueCommaSeperated: string;
    fill: string;
  }[];
  isAnimationActive?: boolean;
  width?: number;
  outerRadius?: number;
  innerRadius?: number;
}
