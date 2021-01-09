import { Routes } from "@angular/router";

import { AnalyticsComponent } from "./analytics/analytics.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { CaffeComponent } from "./caffe/caffe.component";
import { ClassComponent } from "./class/class.component";
import { EmployeeComponent } from "./employee/employee.component";
import { ExpensesComponent } from "./expenses/expenses.component";
import { FeesComponent } from "./fees/fees.component";
import { InquiryComponent } from "./inquiry/inquiry.component";
import { ReportsComponent } from "./reports/reports/reports.component";
import { StudentComponent } from "./student/student.component";

export const DashboardRoutes: Routes = [
  {
    path: "analytics",
    component: AnalyticsComponent
  },
  {
    path: "students",
    component: StudentComponent
  },
  {
    path: "employees",
    component: EmployeeComponent
  },
  {
    path: "fees",
    component: FeesComponent
  },
  {
    path: "students",
    component: StudentComponent
  },
  {
    path: "caffe",
    component: CaffeComponent
  },
  {
    path: "attendance",
    component: AttendanceComponent
  },
  {
    path: "inquiry",
    component: InquiryComponent
  },
  {
    path: "class",
    component: ClassComponent
  },
  {
    path: "reports",
    component: ReportsComponent
  },
  {
    path: "expense",
    component: ExpensesComponent
  }
];
