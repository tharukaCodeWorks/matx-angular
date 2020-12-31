import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'config';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit {

  selectedIndex = 1;
  editMode = false;
  editingObject = {};
  class = new FormGroup({
    inquiry: new FormControl('', Validators.required)
  })

  dataColumns = [];

  dataSource:any = [];

  constructor(private http:HttpClient, private snackBar:MatSnackBar) {}

  updateSelect(data){
    this.selectedIndex = 0;
    this.editMode = true;
    this.editingObject = data;
  }

  getAllClasses(){
    this.http.get(`${config.apiUrl}/inquires`).subscribe((res:any)=>{
      this.dataSource = res.data;
    });
  }

  cancelEditMode(){
    this.editMode = false;
  }

  newClass(){
    let data = {
      inquiry: this.class.get("inquiry").value
    };

    this.http.post(`${config.apiUrl}/inquires`, data).subscribe(res=>{
      this.getAllClasses();
      this.snackBar.open("Created", "Ok", {duration:2000});
      this.class.reset();
    });
  }

  ngOnInit(): void {
    this.dataColumns = ["id", "inquiry"];
    this.getAllClasses();
  }

  ngAfterViewInit() {

  }

}
