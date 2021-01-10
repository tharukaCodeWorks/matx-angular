import { DatePipe } from '@angular/common';
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
  duePayment = 'all';

  fee = new FormGroup({
    stud_id: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    total_paid: new FormControl('', Validators.required),
    installments: new FormControl('', Validators.required)
  });

  dataColumns = [];

  dataSource:any = [];

  constructor(private http:HttpClient, private snackBar:MatSnackBar, public datepipe: DatePipe) {}

  updateSelect(data){
    this.selectedIndex = 0;
    this.editMode = true;
    this.editingObject = data;
    this.fee.patchValue({
      ...data
    });
  }

  filterData(){
    if(this.duePayment=="all"){
      return this.dataSource;
    }else {
      return this.dataSource.filter(item=>{
        return `${item.is_payment_due}`==this.duePayment;
      });
    }
    
  }

  getAllFees(){
    this.http.get(`${config.apiUrl}/fees`).subscribe((res:any)=>{
      this.dataSource = res.data;
    })
  }

  formatDate(date){
    return this.datepipe.transform(new Date(date), 'yyyy-MM-dd');
  }

  deleteFee(id){
    this.http.delete(`${config.apiUrl}/fees/${id}`).subscribe(res=>{
      this.getAllFees();
      this.snackBar.open("Deleted", "Ok", {duration:2000});
    });
  }

  payFee(row){
    let form = new FormData();
    form.append("stud_id", row.stud_id)
    form.append("total_paid", row.monthly_fee)
    this.http.post(`${config.apiUrl}/fees`, form).subscribe(res=>{
      this.getAllFees()
      this.fee.reset();
      this.snackBar.open("Mark as paid", "Ok", {duration:2000})
    },err=>{
      this.snackBar.open("Something went wrong", "Ok", {duration:2000})
    })
  }

  newFee(){
    let form = new FormData();
    form.append("stud_id", this.fee.get("stud_id").value);
    form.append("amount", this.fee.get("amount").value);
    form.append("date", this.fee.get("date").value);
    form.append("total_paid", this.fee.get("total_paid").value);
    form.append("installments", this.fee.get("installments").value);
    if(this.editMode){
      form.append("_method", "PUT");
      form.append("id", this.editingObject.id);
      this.http.post(`${config.apiUrl}/fees/${this.editingObject.id}`, form).subscribe(res=>{
        this.getAllFees();
        this.fee.reset();
        this.snackBar.open("Updated", "Ok", {duration:2000})
      },err=>{
        this.snackBar.open("You entered studented number is invalid!", "Ok", {duration:2000})
      })
    }else{
      this.http.post(`${config.apiUrl}/fees`, form).subscribe(res=>{
        this.getAllFees();
        this.fee.reset();
        this.snackBar.open("Inserted", "Ok", {duration:2000})
      },err=>{
        this.snackBar.open("You entered studented number is invalid!", "Ok", {duration:2000})
      })
    }
  }

  cancelEditMode(){
    this.editMode = false;
    this.fee.reset();
  }

  ngOnInit(): void {
    this.dataColumns = ["id", "stud_id", "stud_name", 'amount_of_course', "total_paid", "reaining_paid", "last_payment_date", "number_of_installements", "remaining_installenments", "monthly_fee", 'is_payment_due', "action"];
    this.getAllFees();
  }

  ngAfterViewInit() {

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.fee.controls[controlName].hasError(errorName);
  }

}
