import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'config';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  selectedIndex = 1;
  editMode = false;
  editingObject:any = {};
  class = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  dataColumns = [];

  dataSource:any = [];

  constructor(private http:HttpClient, private snackBar:MatSnackBar) {}

  updateSelect(data){
    console.log(this.selectedIndex);
    console.log("Cliecked");
    this.selectedIndex = 0;
    this.editMode = true;
    this.editingObject = data;
    this.class.patchValue({
      ...data
    });
  }

  deleteEmployee(id){
    this.http.delete(`${config.apiUrl}/classes/${id}`).subscribe((res:any)=>{
      this.getAllClasses();
      this.snackBar.open("Deleted Successfully", "Ok", {duration:2000})
    })
  }

  getAllClasses(){
    this.http.get(`${config.apiUrl}/classes`).subscribe((res:any)=>{
      this.dataSource = res.data;
    });
  }

  cancelEditMode(){
    this.editMode = false;
  }

  newClass(){
    let data = {
      name: this.class.get("name").value
    };
    
    if(this.editMode){
      data['_method'] = "PUT";
      data['id'] = this.editingObject.id;
      this.http.post(`${config.apiUrl}/classes/${this.editingObject.id}`, data).subscribe(res=>{
        this.getAllClasses();
        this.snackBar.open("Created", "Ok", {duration:2000});
        this.class.reset();
        this.editMode = false;
      });
    }else{
      this.http.post(`${config.apiUrl}/classes`, data).subscribe(res=>{
        this.getAllClasses();
        this.snackBar.open("Created", "Ok", {duration:2000});
        this.class.reset();
        this.editMode = false;
      });
    }
    
  }

  ngOnInit(): void {
    this.dataColumns = ["id", "name", "action"];
    this.getAllClasses();
  }

  ngAfterViewInit() {

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.class.controls[controlName].hasError(errorName);
  }

}
