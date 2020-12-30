import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'config';

@Component({
  selector: 'app-caffe',
  templateUrl: './caffe.component.html',
  styleUrls: ['./caffe.component.scss']
})
export class CaffeComponent implements OnInit {

  selectedIndex = 1;
  editMode = false;
  editingObject:any = {};

  caffe = new FormGroup({
    item: new FormControl('', Validators.required),
    sale_price: new FormControl('', Validators.required),
    cost_price: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  dataColumns = [];

  dataSource:any = [];

  constructor(private http:HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.dataColumns = ["id", "item", "sale_price", "cost_price", "date", "action"];
    this.getAll();
  }

  updateSelect(data){
    this.selectedIndex = 0;
    this.editMode = true;
    this.editingObject = data;
    this.caffe.patchValue({
      ...data
    });
  }

  newCaffe(){
    let form = new FormData();
    form.append("item", this.caffe.get("item").value);
    form.append("sale_price", this.caffe.get("sale_price").value);
    form.append("cost_price", this.caffe.get("cost_price").value);
    form.append("date", this.caffe.get("date").value);
    if(this.editMode){
      form.append("_method", "PUT");
      form.append("id", this.editingObject.sales_id);
      this.http.post(`${config.apiUrl}/cafe/${this.editingObject.sales_id}`, form).subscribe(res=>{
        this.getAll();
        this.snackBar.open("Updated", "Ok", {duration:2000});
        this.caffe.reset();
      });
    }else{
      this.http.post(`${config.apiUrl}/cafe`, form).subscribe(res=>{
        this.getAll();
        this.snackBar.open("Inserted", "Ok", {duration:2000});
        this.caffe.reset();
      });
    }
  }

  getAll(){
    this.http.get(`${config.apiUrl}/cafe`).subscribe((res:any)=>{
      this.dataSource = res.data;
    });
  }

  delete(id){
    this.http.delete(`${config.apiUrl}/cafe/${id}`).subscribe(res=>{
      this.getAll();
    })
  }

  cancelEditMode(){
    this.editMode = false;
    this.caffe.reset();
  }

}
