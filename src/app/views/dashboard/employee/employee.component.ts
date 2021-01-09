import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'config';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  selectedIndex = 1;
  editMode = false;
  editingObject:any = {};
  designation = [
    "Manager",
    "Assistant Manager",
    "Marketing Manager",
    "Accounting Manager",
    "Marketing Associate",
    "HR Associate",
    "Administration Supervisor",
    "Accounting Officer",
    "Cafeteria Manager",
    "Cafeteria Worker",
    "Front Office Clerk",
    "Head Of Academic",
    "Course Coordinator",
    "Lecturer"
  ];

  departments = [
    "Top Management",
    "Administration Department",
    "Marketing Department",
    "Accounting Department",
    "HR Department",
    "Cafeteria Department",
    "Academic Department"
  ]

  employee = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
  });

  dataColumns = [];

  dataSource:any = [];

  constructor(private http:HttpClient, private snackBar: MatSnackBar) {}

  updateSelect(data){
    this.selectedIndex = 0;
    this.editMode = true;
    this.editingObject = data;
    this.employee.patchValue({
      ...data
    });
  }

  getAllEmployees(){
    this.http.get(`${config.apiUrl}/employees`).subscribe((res:any)=>{
      this.dataSource = res.data;
    });
  }

  deleteEmployee(id){
    this.http.delete(`${config.apiUrl}/employees/${id}`).subscribe((res:any)=>{
      this.getAllEmployees();
      this.snackBar.open("Deleted Successfully", "Ok", {duration:2000})
    })
  }

  newEmployee(){
    let form = new FormData();
    form.set("name", this.employee.get("name").value);
    form.set("address", this.employee.get("address").value);
    form.set("designation", this.employee.get("designation").value);
    form.set("department", this.employee.get("department").value);
    form.set("contact", this.employee.get("contact").value);
    if(this.editMode){
      form.set("id", this.editingObject.employee_id);
      form.set("_method", "PUT");
      this.http.post(`${config.apiUrl}/employees/${this.editingObject.employee_id}`, form).subscribe(res=>{
        this.getAllEmployees();
        this.snackBar.open("Employee updated successfully", "Ok", {duration:2000});
        this.employee.reset();
        this.editMode = false;
      });
    }else{
      this.http.post(`${config.apiUrl}/employees`, form).subscribe(res=>{
        this.getAllEmployees();
        this.snackBar.open("Employee added successfully", "Ok", {duration:2000});
        this.employee.reset();
      });
    }
  }

  cancelEditMode(){
    this.editMode = false;
    this.employee.reset();
  }

  ngOnInit(): void {
    this.dataColumns = ["id", "name", "address", "contact", "designation", "department", "action"];
    this.getAllEmployees();
  }

  ngAfterViewInit() {

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.employee.controls[controlName].hasError(errorName);
  }

}
