import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'config';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  selectedIndex = 1;
  editMode = false;
  editingObject:any = {};

  fee = new FormGroup({
    stud_id: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

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

  getAllFees(){
    this.http.get(`${config.apiUrl}/fees`).subscribe((res:any)=>{
      this.dataSource = res.data;
    })
  }

  deleteFee(id){
    this.http.delete(`${config.apiUrl}/fees/${id}`).subscribe(res=>{
      this.getAllFees();
      this.snackBar.open("Deleted", "Ok", {duration:2000});
    });
  }

  newFee(){
    let form = new FormData();
    form.append("stud_id", this.fee.get("stud_id").value);
    form.append("amount", this.fee.get("amount").value);
    form.append("date", this.fee.get("date").value);
    if(this.editMode){
      form.append("_method", "PUT");
      form.append("id", this.editingObject.id);
      this.http.post(`${config.apiUrl}/fees/${this.editingObject.id}`, form).subscribe(res=>{
        this.getAllFees();
        this.fee.reset();
        this.snackBar.open("Updated", "Ok", {duration:2000})
      })
    }else{
      this.http.post(`${config.apiUrl}/fees`, form).subscribe(res=>{
        this.getAllFees();
        this.fee.reset();
        this.snackBar.open("Inserted", "Ok", {duration:2000})
      })
    }
  }

  cancelEditMode(){
    this.editMode = false;
    this.fee.reset();
  }

  ngOnInit(): void {
    this.dataColumns = ["id", "stud_id", "amount", "date"];
    this.getAllFees();
  }

  ngAfterViewInit() {

  }

}
