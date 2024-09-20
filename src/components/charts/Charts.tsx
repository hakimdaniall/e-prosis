import React, { useState, useEffect, ReactNode } from "react";
import {
  Line,
  Pie,
  PieConfig,
  Bar,
  BarConfig,
  ColumnConfig,
  Column,
  Rose,
  RoseConfig,
  Gauge,
  GaugeConfig,
  LineConfig,
} from "@ant-design/plots";

export const BarColData = [
  {
    day: "Yesterday",
    value: 5,
    type: "Online",
  },
  {
    day: "Today",
    value: 11,
    type: "Online",
  },
  {
    day: "Yesterday",
    value: 5,
    type: "Offline",
  },
  {
    day: "Today",
    value: 9,
    type: "Offline",
  },
];

export const WeeklyBarColData = [
  {
    day: "Monday",
    value: 5,
    type: "Online",
  },
  {
    day: "Monday",
    value: 7,
    type: "Offline",
  },
  {
    day: "Tuesday",
    value: 11,
    type: "Online",
  },
  {
    day: "Tuesday",
    value: 9,
    type: "Offline",
  },
  {
    day: "Wednesday",
    value: 5,
    type: "Online",
  },
  {
    day: "Wednesday",
    value: 7,
    type: "Offline",
  },
  {
    day: "Thursday",
    value: 11,
    type: "Online",
  },
  {
    day: "Thursday",
    value: 9,
    type: "Offline",
  },
  {
    day: "Friday",
    value: 5,
    type: "Online",
  },
  {
    day: "Friday",
    value: 7,
    type: "Offline",
  },
  {
    day: "Saturday",
    value: 11,
    type: "Online",
  },
  {
    day: "Saturday",
    value: 9,
    type: "Offline",
  },
  {
    day: "Sunday",
    value: 11,
    type: "Online",
  },
  {
    day: "Sunday",
    value: 9,
    type: "Offline",
  },
];

export const LineChartsSample = () => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 300,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return <Line {...config} />;
};

export const DonutChartsSample = () => {
  type DataType = "Active" | "New" | "Retargeted" | "finished" | "archived";

  interface PieChartData {
    type: DataType;
    value: number;
  }

  const pieChartData: PieChartData[] = [
    {
      type: "Active",
      value: 40,
    },
    {
      type: "New",
      value: 25,
    },
    {
      type: "Retargeted",
      value: 22,
    },
  ];

  const config: PieConfig = {
    appendPadding: 5,
    data: pieChartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.7,
    color: ["#F47A2F", "#39C38B", "#49ABEB"],
    legend: {
      position: "bottom",
      flipPage: false,
    },
    label: {
      type: "bottom",
      offset: "-50%",
      style: {
        textAlign: "center",
        fontSize: 10,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false as const,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        formatter: function formatter() {
          return `134`;
        },
      },
    },
  };
  return <Pie height={200} {...config} />;
};

export const PieChartsSample = () => {
  const data = [
    {
      type: "Car",
      value: 27,
    },
    {
      type: "Lorry",
      value: 25,
    },
    {
      type: "Van",
      value: 18,
    },
    {
      type: "Motorcycle",
      value: 15,
    },
    {
      type: "Bus",
      value: 10,
    },
    {
      type: "Airplane",
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.5,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export const BarChartsSample = () => {
  const config: BarConfig = {
    data: BarColData.reverse(),
    isStack: true,
    xField: "value",
    yField: "day",
    seriesField: "type",
  };
  return <Bar {...config} />;
};

interface ChartsDataProps {
  data: typeof BarColData;
  color: string[];
  isGroup: boolean;
}

export const ColumnChartsSample: React.FC<ChartsDataProps> = ({
  data,
  color,
  isGroup,
}) => {
  const config: ColumnConfig = {
    data,
    isGroup,
    color,
    xField: "day",
    yField: "value",
    seriesField: "type",
    height: 200,
    columnStyle: {
      radius: [5, 5, 0, 0],
      width: 0.7,
    },
  };

  return <Column {...config} />;
};

export const RoseChartsSample = () => {
  const data = [
    {
      type: "Football",
      value: 27,
    },
    {
      type: "Baseball",
      value: 25,
    },
    {
      type: "Basketball",
      value: 18,
    },
    {
      type: "Tennis",
      value: 15,
    },
    {
      type: "Badminton",
      value: 10,
    },
    {
      type: "Kyrin",
      value: 5,
    },
  ];
  const config: RoseConfig = {
    data,
    xField: "type",
    yField: "value",
    seriesField: "type",
    radius: 0.9,
    legend: {
      position: "bottom",
    },
  };
  return <Rose {...config} />;
};

export const GaugeChartsSample = () => {
  const config: GaugeConfig = {
    percent: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: "36px",
          lineHeight: "36px",
        },
      },
    },
  };
  return <Gauge {...config} />;
};

export const MultiLineChartsSample = () => {
  const [data, setData] = useState([]);

  const listData = [
    { month: "January", value: 42, type: "Online Sales" },
    { month: "February", value: 75, type: "Online Sales" },
    { month: "March", value: 18, type: "Online Sales" },
    { month: "April", value: 56, type: "Online Sales" },
    { month: "May", value: 87, type: "Online Sales" },
    { month: "June", value: 32, type: "Online Sales" },
    { month: "July", value: 68, type: "Online Sales" },
    { month: "August", value: 94, type: "Online Sales" },
    { month: "September", value: 12, type: "Online Sales" },
    { month: "October", value: 60, type: "Online Sales" },
    { month: "November", value: 23, type: "Online Sales" },
    { month: "December", value: 51, type: "Online Sales" },
    { month: "January", value: 24, type: "Tender Sales" },
    { month: "February", value: 57, type: "Tender Sales" },
    { month: "March", value: 81, type: "Tender Sales" },
    { month: "April", value: 65, type: "Tender Sales" },
    { month: "May", value: 78, type: "Tender Sales" },
    { month: "June", value: 23, type: "Tender Sales" },
    { month: "July", value: 86, type: "Tender Sales" },
    { month: "August", value: 49, type: "Tender Sales" },
    { month: "September", value: 21, type: "Tender Sales" },
    { month: "October", value: 6, type: "Tender Sales" },
    { month: "November", value: 32, type: "Tender Sales" },
    { month: "December", value: 15, type: "Tender Sales" },
  ];
  const config: LineConfig = {
    data: listData,
    height: 300,
    xField: "month",
    yField: "value",
    seriesField: "type",
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return <Line {...config} />;
};
