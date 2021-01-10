import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'config';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  selectedIndex = 1;
  editMode = false;
  editingObject:any = {};
  
  employee = new FormGroup({
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required)
  });

  dataColumns = [];

  dataSource:any = [];

  constructor(private http:HttpClient, private snackBar: MatSnackBar, private datepipe:DatePipe) {}

  updateSelect(data){
    this.selectedIndex = 0;
    this.editMode = true;
    this.editingObject = data;
    this.employee.patchValue({
      ...data,
      stud_id: data.id
    });
  }

  getAllEmployees(){
    this.http.get(`${config.apiUrl}/expenses`).subscribe((res:any)=>{
      this.dataSource = res.data;
    });
  }

  deleteEmployee(id){
    this.http.delete(`${config.apiUrl}/expenses/${id}`).subscribe((res:any)=>{
      this.getAllEmployees();
      this.snackBar.open("Deleted Successfully", "Ok", {duration:2000})
    })
  }

  newEmployee(){
    if(this.editMode){
      let formattedData = {
        ...this.employee.value,
        _method: "PUT",
        id: this.editingObject.id
      };
      console.log(formattedData);
      this.http.post(`${config.apiUrl}/expenses/${this.editingObject.id}`, formattedData).subscribe(res=>{
        this.getAllEmployees();
        this.snackBar.open("Expense updated successfully", "Ok", {duration:2000});
        this.employee.reset();
        this.editMode = false;
      });
    }else{
      this.http.post(`${config.apiUrl}/expenses`, this.employee.value).subscribe(res=>{
        this.getAllEmployees();
        this.snackBar.open("Expense added successfully", "Ok", {duration:2000});
        this.employee.reset();
      });
    }
  }

  cancelEditMode(){
    this.editMode = false;
    this.employee.reset();
  }

  ngOnInit(): void {
    this.dataColumns = ["amount","detail", "date",  "action"];
    this.getAllEmployees();
  }

  ngAfterViewInit() {

  }

  formatDate(date){
    return this.datepipe.transform(new Date(date), 'yyyy-MM-dd');
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.employee.controls[controlName].hasError(errorName);
  }

}
