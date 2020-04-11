class ChartColors {
  bg: string;
  lines: string;
  lineMonthName: string;
  textMonthName: string;
  textWeekDaysNames: string;
  weekNumsBg: string;
  textWeekNum: string;
}

const chartColorsLight: ChartColors = {
  bg: "white",
  lines: "#D8D8D8",
  lineMonthName: "#A4A4A4",
  textMonthName: "#424242",
  textWeekDaysNames: "#848484",
  weekNumsBg: "#F2F2F2",
  textWeekNum: "#A4A4A4",
};
const chartColorsDark: ChartColors = {
  bg: "#424242",
  lines: "#A4A4A4",
  lineMonthName: "#D8D8D8",
  textMonthName: "#F2F2F2",
  textWeekDaysNames: "#F2F2F2",
  weekNumsBg: "#BDBDBD",
  textWeekNum: "#6E6E6E",
};

export let chartColors: ChartColors = chartColorsLight;
//export let chartColors: ChartColors = chartColorsDark;

export const setupChartColors = (darkMode: boolean = false) => {
  if (darkMode) {
    chartColors = chartColorsDark;
  } else {
    chartColors = chartColorsLight;
  }
};
