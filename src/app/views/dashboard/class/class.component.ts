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
  editingObject = {};
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

    this.http.post(`${config.apiUrl}/classes`, data).subscribe(res=>{
      this.getAllClasses();
      this.snackBar.open("Created", "Ok", {duration:2000});
      this.class.reset();
    });
  }

  ngOnInit(): void {
    this.dataColumns = ["id", "name"];
    this.getAllClasses();
  }

  ngAfterViewInit() {

  }

}
