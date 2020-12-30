import { SharedMaterialModule } from "app/shared/shared-material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";

import { DashboardRoutes } from "./dashboard.routing";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { StudentComponent } from './student/student.component';
import { EmployeeComponent } from './employee/employee.component';
import { FeesComponent } from './fees/fees.component';
import { CaffeComponent } from './caffe/caffe.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { ClassComponent } from './class/class.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    FlexLayoutModule,
    ChartsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    SharedPipesModule,
    PerfectScrollbarModule,
    RouterModule.forChild(DashboardRoutes),
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  declarations: [AnalyticsComponent, StudentComponent, EmployeeComponent, FeesComponent, CaffeComponent, AttendanceComponent, InquiryComponent, ClassComponent],
  exports: []
})
export class DashboardModule {}
