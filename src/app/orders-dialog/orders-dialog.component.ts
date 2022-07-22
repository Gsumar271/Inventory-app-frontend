import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { OrdersApiService } from '../services/orders-api.service';


@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.scss']
})
export class OrdersDialogComponent implements OnInit {

  orderDataForm !: FormGroup;
  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder, private api: OrdersApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<OrdersDialogComponent>) { }

  //initialize all the data for the form 
  ngOnInit(): void {
    this.orderDataForm = this.formBuilder.group({
      id:[''],
      type:['',Validators.required],
      productName:['', Validators.required],
      supplierOrCustomer:['', Validators.required],
      orderQuantity:['', Validators.required],
      itemPrice:['', Validators.required],
      note:['', Validators.required],
    });
    if(this.editData){
      this.actionBtn = "Update"
      this.orderDataForm.controls['id'].setValue(this.editData.id);
      this.orderDataForm.controls['type'].setValue(this.editData.type);
      this.orderDataForm.controls['productName'].setValue(this.editData.productName);
      this.orderDataForm.controls['supplierOrCustomer'].setValue(this.editData.supplierOrCustomer);
      this.orderDataForm.controls['orderQuantity'].setValue(this.editData.orderQuantity);
      this.orderDataForm.controls['itemPrice'].setValue(this.editData.itemPrice);
      this.orderDataForm.controls['note'].setValue(this.editData.note);
    }
  }

  //add a supplier to our data 
  addOrder(){
    if(!this.editData){
      if(this.orderDataForm.valid) {
        this.api.saveOrder(this.orderDataForm.value)
        .subscribe((res) =>{
            alert("Orderadded!");
            this.orderDataForm.reset();
            this.dialogRef.close('Save');
          }
        )
      }
    }else{
      this.updateOrder()
    }
  }
//update product using data from the form 
  updateOrder(){
    this.api.updateOrder(this.orderDataForm.value, this.editData.id)
    .subscribe((res)=>{
      this.orderDataForm.reset();
      this.dialogRef.close('Update');
    })
}
  
}
