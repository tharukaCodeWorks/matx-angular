import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { config } from 'config';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {



  selectedIndex = 1;
  editMode = false;
  editingObject:any = {};
  classes = [];

  student = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    nic: new FormControl('', Validators.required),
  });

  snackConfig:MatSnackBarConfig = {
    duration: 2000,
  }

  dataColumns = [];

  dataSource:any = [];

  constructor(private http:HttpClient, private snackBar: MatSnackBar,
    private viewContainerRef: ViewContainerRef) {}

  updateSelect(data){
    this.selectedIndex = 0;
    this.editMode = true;
    this.editingObject = data;

    this.student.patchValue({
      ...data
    });
  }

  cancelEditMode(){
    this.editMode = false;
    this.student.reset();
  }

  getAllStudents(){
    this.http.get(`${config.apiUrl}/students`).subscribe((res:any)=>{
      this.dataSource = res.data;
    });
  }

  deleteStudent(id){
    this.http.delete(`${config.apiUrl}/students/${id}`).subscribe(res=>{
      this.getAllStudents();
    });
  }

  newStudent(){
    let submitData = new FormData();
    submitData.set("firstname", this.student.get("firstname").value);
    submitData.set("lastname", this.student.get("lastname").value);
    submitData.set("contact", this.student.get("contact").value);
    submitData.set("address", this.student.get("address").value);
    submitData.set("birthday", this.student.get("birthday").value);
    submitData.set("class", this.student.get("class").value);
    submitData.set("nic", this.student.get("nic").value);
    if(this.editMode){
      submitData.set("_method", "PUT");
      submitData.set("id", this.editingObject.id);
      this.http.post(`${config.apiUrl}/students/${this.editingObject.id}`, submitData).subscribe(res=>{
        this.getAllStudents();
        this.snackBar.open("Updated Student", "Ok", this.snackConfig);
        this.student.reset();
        this.editMode = false;
      });
    } else {
      this.http.post(`${config.apiUrl}/students}`, submitData).subscribe(res=>{
        this.getAllStudents();
        this.snackBar.open("Inserted new Student", "Ok", this.snackConfig);
        this.student.reset();
      });
    }
  }

  getAllClasses(){
    this.http.get(`${config.apiUrl}/classes`).subscribe((res:any)=>{
      this.classes = res.data;
    });
  }

  ngOnInit(): void {
    this.dataColumns = ["id", "firstname", "lastname", "class", "birthday", "contact", "address", "nic", "action"];
    this.getAllStudents();
    this.getAllClasses();
  }

  ngAfterViewInit() {

  }

}
