import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'config';
import * as moment from 'moment';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit {

  selectedIndex = 1;
  editMode = false;
  editingObject:any = {};
  class = new FormGroup({
    id: new FormControl('', Validators.required),
    inquiry: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  })

  dataColumns = [];

  inquiryStatus:any = 'all';

  dataSource:any = [];

  filteredDataSource: any = [];

  // dateRange="year";

  constructor(private http:HttpClient, private snackBar:MatSnackBar, public datepipe: DatePipe) {}

  updateSelect(data){
    this.selectedIndex = 0;
    this.editMode = true;
    this.editingObject = data;
    console.log(data);
    this.class.patchValue({
      inquiry: data.inquiry,
      status: `${data.status}`,
      id: data.student_id
    });
  }


  formatDate(date){
    return this.datepipe.transform(new Date(date), 'yyyy-MM-dd');
  }

  filterInquiryByStatus(){
    if(this.inquiryStatus=="all"){
      this.filteredDataSource =  this.dataSource;
    }else if(this.inquiryStatus=='true'){
      this.filteredDataSource = this.dataSource.filter((item)=>{
        return item.status==true;
      });
    }else if(this.inquiryStatus=='false'){
      this.filteredDataSource = this.dataSource.filter((item)=>{
        return item.status==false;
      });
    }
  }

  getAllClasses(){
    this.http.get(`${config.apiUrl}/inquires`).subscribe((res:any)=>{
      this.dataSource = res.data;
      this.filterInquiryByStatus();
    });
  }

  // selectDateRange(){
  //   let startOfMonth;
  //   let endOfMonth;
  //   switch(this.dateRange){
  //     case "year":
  //       startOfMonth = moment().subtract(1,'years').clone().startOf('year').format('DD-MM-YYYY');
  //       endOfMonth   = moment().subtract(1,'years').clone().endOf('year').format('DD-MM-YYYY');
  //       return {start: startOfMonth, end:endOfMonth};
  //       // break;
  //     case "month":
  //       startOfMonth = moment().subtract(1,'months').startOf('month').format('DD-MM-YYYY');
  //       endOfMonth   = moment().subtract(1,'months').endOf('month').format('DD-MM-YYYY');
  //       return {start: startOfMonth, end:endOfMonth};
  //       // break;
  //     case "five_year":
  //       startOfMonth = moment().subtract(5,'years').startOf('month').format('DD-MM-YYYY');
  //       endOfMonth   = moment().clone().endOf('month').format('DD-MM-YYYY');
  //       return {start: startOfMonth, end:endOfMonth};
  //       // break;
  //     case "six_month":
  //       startOfMonth = moment().subtract(6,'months').startOf('month').format('DD-MM-YYYY');
  //       endOfMonth   = moment().endOf('month').format('DD-MM-YYYY');
  //       return {start: startOfMonth, end:endOfMonth};
  //       // break;
  //     default:
  //       return {start: startOfMonth, end:endOfMonth};
  //   }
  // }

  cancelEditMode(){
    this.editMode = false;
  }

  deleteFee(id){
    this.http.delete(`${config.apiUrl}/inquires/${id}`).subscribe(res=>{
      this.getAllClasses();
      this.snackBar.open("Deleted", "Ok", {duration:2000});
    });
  }

  newClass(){
    let data = {
      id: this.class.get("id").value,
      inquiry: this.class.get("inquiry").value,
      status: this.class.get("status").value=="true"?true:false,
    };
    if(this.editMode){
      this.http.put(`${config.apiUrl}/inquires/${this.editingObject.id}`, data).subscribe(res=>{
        this.getAllClasses();
        this.snackBar.open("Updated", "Ok", {duration:2000});
        this.class.reset();
      });
    }else{
      this.http.post(`${config.apiUrl}/inquires`, data).subscribe(res=>{
        this.getAllClasses();
        this.snackBar.open("Created", "Ok", {duration:2000});
        this.class.reset();
      });
    }
  }

  ngOnInit(): void {
    this.dataColumns = ["id", "student_id", "student_name", "created_date","status","inquiry", "action"];
    this.getAllClasses();
  }

  ngAfterViewInit() {

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.class.controls[controlName].hasError(errorName);
  }

}
