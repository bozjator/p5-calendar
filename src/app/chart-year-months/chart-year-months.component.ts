import { Component, OnInit } from "@angular/core";
import * as p5 from "p5";
import { YearMonth } from "./chart-parts/year-month";
import { chartColors } from "src/app/shared/chart-colors";

@Component({
  selector: "app-chart-year-months",
  templateUrl: "./chart-year-months.component.html",
  styleUrls: ["./chart-year-months.component.scss"],
})
export class ChartYearMonthsComponent implements OnInit {
  yearToShow = 2020;
  yearMonths: YearMonth[] = [];

  sketch = (p5: p5) => {
    p5.setup = () => {
      this.setup(p5);
    };

    p5.draw = () => {
      this.draw(p5);
    };
  };

  constructor() {
    const myp5 = new p5(this.sketch); //, "chartYearMonths");
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      this.yearMonths.push(new YearMonth(myp5, this.yearToShow, monthIndex));
    }
  }

  ngOnInit() {}

  setup(p5: p5) {
    p5.frameRate(30);
    p5.noLoop();
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  }

  draw(p5: p5) {
    p5.background(chartColors.bg);
    this.yearMonths.forEach((month) => {
      month.draw();
    });
  }
}
