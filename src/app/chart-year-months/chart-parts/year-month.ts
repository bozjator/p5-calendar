import * as p5 from "p5";
import * as moment from "moment";
import { chartColors } from "src/app/shared/chart-colors";

export class YearMonth {
  monthName;

  x;
  y;

  height_monthName = 5;
  height_weekDays = 20;
  width_weekNum = 20;
  width_day = 25;
  height_day = 25;
  numOfCols = 7;
  numOfRows = 6;

  width = this.width_weekNum + this.numOfCols * this.width_day;
  height =
    this.height_monthName +
    this.height_weekDays +
    this.numOfRows * this.height_day;

  monthPaddingX = 40;
  monthPaddingY = 55;

  weekDayShortNames = [];
  weeks: any[];

  constructor(private p5: p5, year: number, private monthIndex: number) {
    this.monthName = moment.months(monthIndex);

    const colIndex = monthIndex % 4;
    const rowIndex = Math.floor(monthIndex / 4);

    const additionalTopPadding = 10;

    this.x = colIndex * this.width + this.monthPaddingX * colIndex;
    this.y =
      rowIndex * this.height +
      this.monthPaddingY * rowIndex +
      additionalTopPadding;

    this.prepareWeeks(year, monthIndex);
  }

  draw() {
    //this.p5.stroke(chartColors.bg);
    this.p5.strokeWeight(0);

    // Write month name.
    this.p5.fill(chartColors.textMonthName);
    this.p5.text(this.monthName, this.x, this.y);

    // Draw short week days names.
    this.p5.fill(chartColors.textWeekDaysNames);
    for (let weekDayIndex = 0; weekDayIndex < this.numOfCols; weekDayIndex++) {
      const xPadding = 9;
      const x =
        this.x + this.width_weekNum + weekDayIndex * this.width_day + xPadding;
      const y = this.y + this.height_monthName + this.height_weekDays;
      this.p5.text(this.weekDayShortNames[weekDayIndex], x, y);
    }

    // Draw week days numbers.
    for (let weekIndex = 0; weekIndex < this.weeks.length; weekIndex++) {
      const days = this.weeks[weekIndex].days;
      const y =
        this.y +
        this.height_monthName +
        this.height_weekDays +
        weekIndex * this.height_day +
        this.monthPaddingY * 0.5;
      for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const day = days[dayIndex];
        const dayNum = day.format("D");
        const x =
          this.x +
          this.width_weekNum +
          this.width_day * dayIndex +
          (dayNum < 10 ? 9 : 6);
        this.p5.text(`${dayNum}`, x, y);
      }
    }

    // Draw week numbers bg.
    this.p5.fill(chartColors.weekNumsBg);
    const weekNumBgX = this.x;
    const weekNumBgY =
      this.y + this.height_monthName + this.height_weekDays + 10;
    this.p5.rect(
      weekNumBgX,
      weekNumBgY,
      this.width_weekNum,
      this.numOfRows * this.height_day
    );

    // Draw week numbers.
    this.p5.fill(chartColors.textWeekNum);
    for (let weekIndex = 0; weekIndex < this.weeks.length; weekIndex++) {
      const y =
        this.y +
        this.height_monthName +
        this.height_weekDays +
        weekIndex * this.height_day +
        this.monthPaddingY * 0.5;
      const weekNum = this.weeks[weekIndex].weekNum;
      this.p5.text(`${weekNum}`, this.x + (weekNum < 10 ? 7 : 3), y);
    }

    // Draw line between month name and week days.
    this.p5.strokeWeight(1);
    this.p5.stroke(chartColors.lineMonthName);
    this.p5.line(
      this.x,
      this.y + this.height_monthName,
      this.x + this.width_weekNum + this.width_day * this.numOfCols,
      this.y + this.height_monthName
    );

    this.p5.strokeWeight(1);
    this.p5.stroke(chartColors.lines);
    this.drawDaysLines();
  }

  private drawDaysLines() {
    const yPadding = 10;
    // Horizontal
    for (let rowIndex = 0; rowIndex <= this.numOfRows; rowIndex++) {
      const y =
        this.y +
        this.height_monthName +
        yPadding +
        this.height_weekDays +
        this.height_day * rowIndex;
      this.p5.line(
        this.x + this.width_weekNum,
        y,
        this.x + this.width_weekNum + this.width_day * this.numOfCols,
        y
      );
    }
    // Vertical
    for (let colIndex = 0; colIndex <= this.numOfCols; colIndex++) {
      const x = this.x + this.width_weekNum + this.width_day * colIndex;
      const y1 =
        this.y + this.height_monthName + yPadding + this.height_weekDays;
      const y2 = y1 + (this.numOfCols - 1) * this.height_day;
      this.p5.line(x, y1, x, y2);
    }
  }

  private prepareWeeks(year: number, monthIndex: number) {
    const date = moment(`${year}-${monthIndex + 1}-1`, "YYYY-M-D");
    const startWeek = date.startOf("month").week();
    const endWeek = date.add(5, "week").week();
    const goesToNewYear = endWeek < startWeek;
    const endWeekToUse = goesToNewYear ? startWeek + 6 - endWeek : endWeek;

    this.weeks = [];
    for (var week = startWeek; week < startWeek + 6; week++) {
      let weekToUse = week;
      if (goesToNewYear) {
        weekToUse = week > endWeekToUse ? week - endWeekToUse : week;
      }
      this.weeks.push({
        weekNum: weekToUse,
        days: Array(7)
          .fill(0)
          .map((n, i) =>
            moment(`${year}`, "YYYY")
              .week(week)
              .startOf("week")
              .clone()
              .add(n + i, "day")
          ),
      });
    }

    // Prepare week day names.
    this.weekDayShortNames = [];
    this.weeks[0].days.forEach((day) => {
      this.weekDayShortNames.push(day.format("dddd").charAt(0));
    });
  }
}
