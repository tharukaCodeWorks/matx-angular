import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { config } from 'config';
import * as moment from 'moment'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  selectedIndex = 0;

  view: any[] = [1000, 400];
 
  selectedMonth="jan";
  timeRange="month";
  dateRange="year";
  classReport:any[]=[];
  inquiryStatus:any = 'all';

  monthlyIncome:any[] = [];
  monthlyExpenses:any[] = [];
  caffeExpense: any[] = [];
  caffeIncome: any[] = [];
  single: any[] = [];
  multi: any[] = [];
  studentAttendance: any[] = [];
  staffAttendance: any[] = [];
  classAttendance: any[] = [];
  inquiries:any[]=[];

  dataColumns = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

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

  getCaffeSalesChartData(){
    this.http.get(`${config.apiUrl}/reports/cafe/income?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        preparedData.push({
          "name": `${element.year}-${element.month}`,
          "value": element.value
        });
        console.log(this.caffeIncome);
        this.caffeIncome = preparedData;
      });
      if(res.data.length==0){
        this.caffeIncome = [];
      }
    });
  }

  getCaffeExpenseData(){
    this.http.get(`${config.apiUrl}/reports/cafe/expense?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        preparedData.push({
          "name": `${element.year}-${element.month}`,
          "value": element.value
        });
        console.log(this.caffeIncome);
        this.caffeExpense = preparedData;
      });
      if(res.data.length==0){
        this.caffeExpense = [];
      }
    });
  }

  getInstituteSalesData(){
    this.http.get(`${config.apiUrl}/reports/institute/income?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        preparedData.push({
          "name": `${element.year}-${element.month}`,
          "value": element.value
        });
        console.log(this.caffeIncome);
        this.monthlyIncome = preparedData;
      });
      if(res.data.length==0){
        this.monthlyIncome = [];
      }
    });
  }

  getInstituteExpenseData(){
    this.http.get(`${config.apiUrl}/reports/institute/expense?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        preparedData.push({
          "name": `${element.year}-${element.month}`,
          "value": element.value
        });
        console.log(this.caffeIncome);
        this.monthlyExpenses = preparedData;
      });
      if(res.data.length==0){
        this.monthlyExpenses = [];
      }
    });
  }

  getStudentAttendance(){
    this.http.get(`${config.apiUrl}/reports/attendance/students?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        preparedData.push({
          "name": `${element.year}-${element.month}`,
          "value": element.value
        });
        console.log(this.caffeIncome);
        this.studentAttendance = preparedData;
      });
      if(res.data.length==0){
        this.studentAttendance = [];
      }
    });
  }

  getStaffAttendance(){
    this.http.get(`${config.apiUrl}/reports/attendance/staffs?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        preparedData.push({
          "name": `${element.year}-${element.month}`,
          "value": element.value
        });
        console.log(this.caffeIncome);
        this.staffAttendance = preparedData;
      });
      if(res.data.length==0){
        this.staffAttendance = [];
      }
    });
  }

  getClassAttendance(){
    this.http.get(`${config.apiUrl}/reports/classes?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        console.log(this.caffeIncome);
        this.classReport = res.data;
      });
      if(res.data.length==0){
        this.classReport = [];
      }
    });
  }

  getStudentRegistrationData(){
    this.http.get(`${config.apiUrl}/reports/attendance/students?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        preparedData.push({
          "name": `${element.year}-${element.month}`,
          "value": element.value
        });
        console.log(this.caffeIncome);
        this.single = preparedData;
      });
      if(res.data.length==0){
        this.single = [];
      }
    });
  }

  getInquiries(){
    this.http.get(`${config.apiUrl}/reports/inquires?dateFrom=${this.selectDateRange().start}&dateTo=${this.selectDateRange().end}`).subscribe((res:any)=>{
      let preparedData= [];
      res.data.forEach(element => {
        // this.dataColumns.push(`${element.year}-${element.month}`);
        preparedData.push({
          "name": `${element.year}-${element.month}`,
          "value": element.value
        });
        console.log(this.caffeIncome);
        this.inquiries = preparedData;
      });
      if(res.data.length==0){
        this.inquiries = [];
      }
    });
  }

  selectDateRange(){
    let startOfMonth;
    let endOfMonth;
    switch(this.dateRange){
      case "this":
        startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
        endOfMonth   = moment().endOf('month').format('DD-MM-YYYY');
        return {start: startOfMonth, end:endOfMonth};
      case "year":
        startOfMonth = moment().subtract(1,'years').clone().startOf('year').format('DD-MM-YYYY');
        endOfMonth   = moment().subtract(1,'years').clone().endOf('year').format('DD-MM-YYYY');
        return {start: startOfMonth, end:endOfMonth};
        // break;
      case "month":
        startOfMonth = moment().subtract(1,'months').startOf('month').format('DD-MM-YYYY');
        endOfMonth   = moment().subtract(1,'months').endOf('month').format('DD-MM-YYYY');
        return {start: startOfMonth, end:endOfMonth};
        // break;
      case "five_year":
        startOfMonth = moment().subtract(5,'years').startOf('month').format('DD-MM-YYYY');
        endOfMonth   = moment().clone().endOf('month').format('DD-MM-YYYY');
        return {start: startOfMonth, end:endOfMonth};
        // break;
      case "six_month":
        startOfMonth = moment().subtract(6,'months').startOf('month').format('DD-MM-YYYY');
        endOfMonth   = moment().endOf('month').format('DD-MM-YYYY');
        return {start: startOfMonth, end:endOfMonth};
        // break;
      default:
        return {start: startOfMonth, end:endOfMonth};
    }
  }

  constructor(private http:HttpClient) {
    this.getCaffeSalesChartData();
    this.getCaffeExpenseData();
    this.getInstituteExpenseData();
    this.getInstituteSalesData();
    this.getStudentRegistrationData();
    this.getStudentAttendance();
    this.getStaffAttendance();
    this.getClassAttendance();
    this.getInquiries();
    // this.single = [
    //   {
    //     "name": "Jan",
    //     "value": 34
    //   },
    //   {
    //     "name": "Feb",
    //     "value": 56
    //   },
    //   {
    //     "name": "Mar",
    //     "value": 67
    //   },
    //   {
    //     "name": "Apr",
    //     "value": 56
    //   },
    //   {
    //     "name": "May",
    //     "value": 34
    //   },
    //   {
    //     "name": "Jun",
    //     "value": 45
    //   },
    //   {
    //     "name": "Jul",
    //     "value": 59
    //   },
    //   {
    //     "name": "Aug",
    //     "value": 48
    //   },
    //   {
    //     "name": "Sep",
    //     "value": 54
    //   },
    //   {
    //     "name": "Oct",
    //     "value": 67
    //   },
    //   {
    //     "name": "Nov",
    //     "value": 61
    //   },
    //   {
    //     "name": "Dec",
    //     "value": 53
    //   }
    // ];

    // this.caffeExpense = [
    //   {
    //     "name": "Jan",
    //     "value": 253476
    //   },
    //   {
    //     "name": "Feb",
    //     "value": 315000
    //   },
    //   {
    //     "name": "Mar",
    //     "value": 225000
    //   },
    //   {
    //     "name": "Apr",
    //     "value": 235247
    //   },
    //   {
    //     "name": "May",
    //     "value": 287652
    //   },
    //   {
    //     "name": "Jun",
    //     "value": 238635
    //   },
    //   {
    //     "name": "Jul",
    //     "value": 287356
    //   },
    //   {
    //     "name": "Aug",
    //     "value": 298375
    //   },
    //   {
    //     "name": "Sep",
    //     "value": 276543
    //   },
    //   {
    //     "name": "Oct",
    //     "value": 238653
    //   },
    //   {
    //     "name": "Nov",
    //     "value": 283465
    //   },
    //   {
    //     "name": "Dec",
    //     "value": 239475
    //   }
    // ];

    // this.caffeIncome = [
    //   {
    //     "name": "Jan",
    //     "value": 437654
    //   },
    //   {
    //     "name": "Feb",
    //     "value": 512345
    //   },
    //   {
    //     "name": "Mar",
    //     "value": 456879
    //   },
    //   {
    //     "name": "Apr",
    //     "value": 412987
    //   },
    //   {
    //     "name": "May",
    //     "value": 521876
    //   },
    //   {
    //     "name": "Jun",
    //     "value": 478987
    //   },
    //   {
    //     "name": "Jul",
    //     "value": 431658
    //   },
    //   {
    //     "name": "Aug",
    //     "value": 543835
    //   },
    //   {
    //     "name": "Sep",
    //     "value": 472524
    //   },
    //   {
    //     "name": "Oct",
    //     "value": 627253
    //   },
    //   {
    //     "name": "Nov",
    //     "value": 425372
    //   },
    //   {
    //     "name": "Dec",
    //     "value": 345625
    //   }
    // ];

    // this.monthlyExpenses = [
    //   {
    //     "name": "Jan",
    //     "value": 725000
    //   },
    //   {
    //     "name": "Feb",
    //     "value": 655000
    //   },
    //   {
    //     "name": "Mar",
    //     "value": 795000
    //   },
    //   {
    //     "name": "Apr",
    //     "value": 790123
    //   },
    //   {
    //     "name": "May",
    //     "value": 698234
    //   },
    //   {
    //     "name": "Jun",
    //     "value": 912423
    //   },
    //   {
    //     "name": "Jul",
    //     "value": 834539
    //   },
    //   {
    //     "name": "Aug",
    //     "value": 654321
    //   },
    //   {
    //     "name": "Sep",
    //     "value": 698544
    //   },
    //   {
    //     "name": "Oct",
    //     "value": 734987
    //   },
    //   {
    //     "name": "Nov",
    //     "value": 954832
    //   },
    //   {
    //     "name": "Dec",
    //     "value": 826973
    //   }
    // ];


    // this.monthlyIncome = [
    //   {
    //     "name": "Jan",
    //     "value": 1342000
    //   },
    //   {
    //     "name": "Feb",
    //     "value": 1280000
    //   },
    //   {
    //     "name": "Mar",
    //     "value": 1500000
    //   },
    //   {
    //     "name": "Apr",
    //     "value": 1543287
    //   },
    //   {
    //     "name": "May",
    //     "value": 1342392
    //   },
    //   {
    //     "name": "Jun",
    //     "value": 1468364
    //   },
    //   {
    //     "name": "Jul",
    //     "value": 1376259
    //   },
    //   {
    //     "name": "Aug",
    //     "value": 1283746
    //   },
    //   {
    //     "name": "Sep",
    //     "value": 1453383
    //   },
    //   {
    //     "name": "Oct",
    //     "value": 1342692
    //   },
    //   {
    //     "name": "Nov",
    //     "value": 1573534
    //   },
    //   {
    //     "name": "Dec",
    //     "value": 1453725
    //   }
    // ];
    this.dataColumns = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
   }

  ngOnInit(): void {
    this.dataColumns = ["id", "class_name", "student_count", "lecturer_name"];
  }

}
