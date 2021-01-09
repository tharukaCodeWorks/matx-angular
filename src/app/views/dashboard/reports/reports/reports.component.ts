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

  selectedMonth="jan";
  timeRange="month";

  monthlyIncome:any[];
  monthlyExpenses:any[];
  caffeExpense: any[];
  caffeIncome: any[];

  dataColumns = [];

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
        "value": 34
      },
      {
        "name": "Feb",
        "value": 56
      },
      {
        "name": "Mar",
        "value": 67
      },
      {
        "name": "Apr",
        "value": 56
      },
      {
        "name": "May",
        "value": 34
      },
      {
        "name": "Jun",
        "value": 45
      },
      {
        "name": "Jul",
        "value": 59
      },
      {
        "name": "Aug",
        "value": 48
      },
      {
        "name": "Sep",
        "value": 54
      },
      {
        "name": "Oct",
        "value": 67
      },
      {
        "name": "Nov",
        "value": 61
      },
      {
        "name": "Dec",
        "value": 53
      }
    ];

    this.caffeExpense = [
      {
        "name": "Jan",
        "value": 253476
      },
      {
        "name": "Feb",
        "value": 315000
      },
      {
        "name": "Mar",
        "value": 225000
      },
      {
        "name": "Apr",
        "value": 235247
      },
      {
        "name": "May",
        "value": 287652
      },
      {
        "name": "Jun",
        "value": 238635
      },
      {
        "name": "Jul",
        "value": 287356
      },
      {
        "name": "Aug",
        "value": 298375
      },
      {
        "name": "Sep",
        "value": 276543
      },
      {
        "name": "Oct",
        "value": 238653
      },
      {
        "name": "Nov",
        "value": 283465
      },
      {
        "name": "Dec",
        "value": 239475
      }
    ];

    this.caffeIncome = [
      {
        "name": "Jan",
        "value": 437654
      },
      {
        "name": "Feb",
        "value": 512345
      },
      {
        "name": "Mar",
        "value": 456879
      },
      {
        "name": "Apr",
        "value": 412987
      },
      {
        "name": "May",
        "value": 521876
      },
      {
        "name": "Jun",
        "value": 478987
      },
      {
        "name": "Jul",
        "value": 431658
      },
      {
        "name": "Aug",
        "value": 543835
      },
      {
        "name": "Sep",
        "value": 472524
      },
      {
        "name": "Oct",
        "value": 627253
      },
      {
        "name": "Nov",
        "value": 425372
      },
      {
        "name": "Dec",
        "value": 345625
      }
    ];

    this.monthlyExpenses = [
      {
        "name": "Jan",
        "value": 725000
      },
      {
        "name": "Feb",
        "value": 655000
      },
      {
        "name": "Mar",
        "value": 795000
      },
      {
        "name": "Apr",
        "value": 790123
      },
      {
        "name": "May",
        "value": 698234
      },
      {
        "name": "Jun",
        "value": 912423
      },
      {
        "name": "Jul",
        "value": 834539
      },
      {
        "name": "Aug",
        "value": 654321
      },
      {
        "name": "Sep",
        "value": 698544
      },
      {
        "name": "Oct",
        "value": 734987
      },
      {
        "name": "Nov",
        "value": 954832
      },
      {
        "name": "Dec",
        "value": 826973
      }
    ];


    this.monthlyIncome = [
      {
        "name": "Jan",
        "value": 1342000
      },
      {
        "name": "Feb",
        "value": 1280000
      },
      {
        "name": "Mar",
        "value": 1500000
      },
      {
        "name": "Apr",
        "value": 1543287
      },
      {
        "name": "May",
        "value": 1342392
      },
      {
        "name": "Jun",
        "value": 1468364
      },
      {
        "name": "Jul",
        "value": 1376259
      },
      {
        "name": "Aug",
        "value": 1283746
      },
      {
        "name": "Sep",
        "value": 1453383
      },
      {
        "name": "Oct",
        "value": 1342692
      },
      {
        "name": "Nov",
        "value": 1573534
      },
      {
        "name": "Dec",
        "value": 1453725
      }
    ];
    this.dataColumns = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
   }

  ngOnInit(): void {
  }

}
