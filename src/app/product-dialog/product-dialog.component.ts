import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
//component for the dialog 
export class ProductDialogComponent implements OnInit {

  productDataForm !: FormGroup;
  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ProductDialogComponent>) { }

  //initialize all the data for the form 
  ngOnInit(): void {
    this.productDataForm = this.formBuilder.group({
      id:[''],
      name:['', Validators.required],
      desc:['', Validators.required],
      supplierId:['', Validators.required],
      itemPrice:['', Validators.required],
      salesPrice:['', Validators.required],
      quantity:['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Update"
      this.productDataForm.controls['id'].setValue(this.editData.id);
      this.productDataForm.controls['name'].setValue(this.editData.name);
      this.productDataForm.controls['desc'].setValue(this.editData.desc);
      this.productDataForm.controls['supplierId'].setValue(this.editData.supplierId);
      this.productDataForm.controls['itemPrice'].setValue(this.editData.itemPrice);
      this.productDataForm.controls['salesPrice'].setValue(this.editData.salesPrice);
      this.productDataForm.controls['quantity'].setValue(this.editData.quantity);
    }
  }

  //add a product to our data 
  addProduct(){
    if(!this.editData){
      if(this.productDataForm.valid) {
        this.api.saveProduct(this.productDataForm.value)
        .subscribe((res) =>{
            alert("Product added!");
            this.productDataForm.reset();
            this.dialogRef.close('Save');
          }
        )
      }
    }else{
      this.updateProduct()
    }
  }
//update product using data from the form 
  updateProduct(){
    console.log("product updating")
    this.api.updateProduct(this.productDataForm.value, this.editData.id)
    .subscribe((res)=>{
      this.productDataForm.reset();
      this.dialogRef.close('Update');
    })
}
  

}
