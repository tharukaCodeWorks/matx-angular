import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from "tinycolor2";
import PerfectScrollbar from "perfect-scrollbar";
import { HttpClient } from "@angular/common/http";
import { config } from "config";
import * as moment from 'moment';

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  animations: matxAnimations
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  trafficVsSaleOptions: any;
  trafficVsSale: any;
  trafficData: any;
  saleData: any;

  fromDateThisMonth = '2020-12-01';
  toDateThisMonth = '2020-12-30';

  sessionOptions: any;
  sessions: any;
  sessionsData: any;

  trafficGrowthChart: any;
  bounceRateGrowthChart: any;

  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];
  doughNutPieOptions: any;

  statCardList = [
    {
      icon: "people",
      title: "Number of Students",
      amount: "3,050",
      color: "primary"
    },
    {
      icon: "money",
      title: "Expenses",
      amount: "This month expense",
      color: "primary"
    },
    {
      icon: "shopping_cart",
      title: "Orders to deliver",
      amount: "305 Orders",
      color: "primary"
    }
  ];

  lastMonthIncome = [];
  lastMonthDates = [];

  getInstituteIncome(){
    this.http.get(`${config.apiUrl}/reports/institute/income?dateFrom=01-01-2020&dateTo=30-12-2020`).subscribe((res:any)=>{
      var prevMonth = moment().subtract(1, 'month').startOf('month');
      console.log(prevMonth);
      var prevMonthDays = prevMonth.daysInMonth();  
      var prevMonthDates = [];
      for (var i = 0; i < prevMonthDays; i++) {
        var prevMonthDay = prevMonth.clone().add(i, 'days').format("YYYY-MM-DD");
        console.log(prevMonthDay);
        let searchDay = res.data.filter(item=>item.date==prevMonthDay);
        searchDay.forEach(incom=>{
          if(incom.sale_price==undefined){
            this.lastMonthIncome.push(incom.amount);
          }else{
            this.lastMonthIncome.push(incom.sale_price);
          }
        });
        if(searchDay.length==0){
          this.lastMonthIncome.push(0);
        }
        this.lastMonthDates.push(i+1)
      }
      this.initDailyTrafficChartBar(this.themeService.activatedTheme);
      this.statCardList.push(
        {
          icon: "attach_money",
          title: "This Month Sales",
          amount: `$${res.totalIncome}`,
          color: "primary"
        },
      )
    });
  }

  constructor(private themeService: ThemeService, private http:HttpClient) {}

  ngAfterViewInit() {}
  ngOnInit() {

    // this.initDailyTrafficChartBar(this.themeService.activatedTheme);
    this.getInstituteIncome();
    this.initDoughNutPieOptions(this.themeService.activatedTheme);
  }

  initDoughNutPieOptions(theme) {
    console.log("Chart Activated");
    this.doughNutPieOptions = {
      backgroundColor: "transparent",
      color: [
        "#f44336",
        "#ff9e43",
        "rgba(116, 103, 239, 1)"
      ],
      legend: {
        show: true,
        itemGap: 20,
        icon: "circle",
        bottom: 0,
        textStyle: {
          fontSize: 13,
          fontFamily: "roboto"
        }
      },
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Traffic Rate",
          type: "pie",
          radius: ["45%", "72.55%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,

          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "normal",
                color: "rgba(116, 103, 239, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 65,
              name: "Class Fees"
            },
            {
              value: 20,
              name: "Caffe"
            },
            { value: 15, name: "Others" }
          ],

          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  initDailyTrafficChartBar(theme) {
    this.dailyTrafficChartBar = {
      grid: {
        top: 16,
        left: 36,
        right: 16,
        bottom: 32
      },
      legend: {},
      tooltip: {
        show: true,
        trigger: "axis",

        axisPointer: {
          type: "cross",
          lineStyle: {
            opacity: 0
          }
        },
        crossStyle: {
          color: "#000"
        }
      },
      series: [
        {
          data: [...this.lastMonthIncome],
          type: "line",
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 2,
            color: "#fff"
          }
        }
      ],
      xAxis: {
        show: true,
        type: "category",
        showGrid: false,
        boundaryGap: false,
        data: [
          ...this.lastMonthDates
        ],
        axisLabel: {
          color: "#ccc",
          margin: 20
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 10,
        max: 10000,
        axisLabel: {
          color: "#ccc",
          margin: 20,
          fontSize: 13,
          fontFamily: "roboto"
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, .1)"
          }
        },

        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      color: [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(255,255,255,0.3)" // color at 0% position
            },
            {
              offset: 1,
              color: "rgba(255,255,255,0)" // color at 100% position
            }
          ],
          global: false // false by default
        }
      ]
    };
  }

  getProductStatus(value) {
    if (value) {
      if (value < 20) {
        return {
          color: "accent",
          status: `${value} available`
        };
      } else
        return {
          color: "primary",
          status: `in stock`
        };
    } else
      return {
        color: "warn",
        status: `out of stcok`
      };
  }
}
