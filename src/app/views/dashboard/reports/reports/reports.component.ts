import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  selectedIndex = 0;

  view: any[] = [1000, 400];

  single: any[];
  multi: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Expense';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    this.single = [
      {
        "name": "Jan",
        "value": 8940000
      },
      {
        "name": "Feb",
        "value": 5000000
      },
      {
        "name": "Mar",
        "value": 7200000
      },
      {
        "name": "Apr",
        "value": 1232332
      },
      {
        "name": "May",
        "value": 453000
      },
      {
        "name": "Jun",
        "value": 89333
      },
      {
        "name": "Jul",
        "value": 340000
      },
      {
        "name": "Aug",
        "value": 120000
      },
      {
        "name": "Sep",
        "value": 10000
      },
      {
        "name": "Oct",
        "value": 23000
      },
      {
        "name": "Nov",
        "value": 45000
      },
      {
        "name": "Dec",
        "value": 30000
      }
    ];
   }

  ngOnInit(): void {
  }

}
