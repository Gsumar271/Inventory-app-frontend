import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { SuppliersApiService } from '../services/suppliers-api.service';


@Component({
  selector: 'app-suppliers-dialog',
  templateUrl: './suppliers-dialog.component.html',
  styleUrls: ['./suppliers-dialog.component.scss']
})
//component for the dialog 
export class SuppliersDialogComponent implements OnInit {

  supplierDataForm !: FormGroup;
  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder, private api: SuppliersApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<SuppliersDialogComponent>) { }

  //initialize all the data for the form 
  ngOnInit(): void {
    this.supplierDataForm = this.formBuilder.group({
      id:[''],
      name:['', Validators.required],
      address:['', Validators.required],
      phoneNumber:['', Validators.required],
      email:['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Update"
      this.supplierDataForm.controls['id'].setValue(this.editData.id);
      this.supplierDataForm.controls['name'].setValue(this.editData.name);
      this.supplierDataForm.controls['address'].setValue(this.editData.address);
      this.supplierDataForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.supplierDataForm.controls['email'].setValue(this.editData.email);
    }
  }

  //add a supplier to our data 
  addSupplier(){
    if(!this.editData){
      if(this.supplierDataForm.valid) {
        this.api.saveSupplier(this.supplierDataForm.value)
        .subscribe((res) =>{
            alert("Supplier added!");
            this.supplierDataForm.reset();
            this.dialogRef.close('Save');
          }
        )
      }
    }else{
      this.updateSupplier()
    }
  }
//update product using data from the form 
  updateSupplier(){
    this.api.updateSupplier(this.supplierDataForm.value, this.editData.id)
    .subscribe((res)=>{
      this.supplierDataForm.reset();
      this.dialogRef.close('Update');
    })
}
  

}
