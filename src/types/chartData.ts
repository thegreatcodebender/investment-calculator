interface PieData {
  title: string;
  value: number;
  fill: string;
  valueCommaSeperated: string;
}

export interface PieChartData {
  pieData: PieData[];
}
