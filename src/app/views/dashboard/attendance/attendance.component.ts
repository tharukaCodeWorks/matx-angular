import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'config';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  selectedIndex = 1;
  editMode = false;
  editingObject:any = {};
  classes: any = [];

  attend = new FormGroup({
    id: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  filter = new FormGroup({
    type: new FormControl('all', Validators.required),
    status: new FormControl('0', Validators.required),
    range: new FormControl('today', Validators.required)
  });

  dataColumns = [];

  dataSource:any = [];

  constructor(private http:HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.dataColumns = ["id", "user_type", "user_number", "name", "date", "status"];
  }

  getAllAttendance(){
    this.http.get(`${config.apiUrl}/attendance?status=${this.filter.get("status").value}&filter=${this.filter.get("type").value}&interval=${this.filter.get("range").value}`).subscribe((res:any)=>{
      this.dataSource = res.data;
      this.snackBar.open("Fetched results", "Ok", {duration:2000});
    });
  }

  newAttend(){
    let form = {
      id: this.attend.get("id").value,
      type: this.attend.get("type").value,
      status: this.attend.get("status").value=="true"?true:false
    }

    this.http.post(`${config.apiUrl}/attendance`, form).subscribe(res=>{
      this.getAllAttendance();
      this.attend.reset();
      this.snackBar.open("Attendance recorded", "Ok", {duration:2000});
    },error=>{
      this.snackBar.open("Sorry, I can't find any user assosiated with the user number!", "Ok", {duration:2000});
    });
  }

  getUserType(model){
    return model.split("\\")[2]
  }

  filterSubmit(){

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.attend.controls[controlName].hasError(errorName);
  }

  getAllClasses(){
    this.http.get(`${config.apiUrl}/classes`).subscribe((res:any)=>{
      this.classes = res.data;
    });
  }

}
