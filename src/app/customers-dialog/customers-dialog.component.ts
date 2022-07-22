import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { CustomersApiService } from '../services/customers-api.service';


@Component({
  selector: 'app-customers-dialog',
  templateUrl: './customers-dialog.component.html',
  styleUrls: ['./customers-dialog.component.scss']
})
export class CustomersDialogComponent implements OnInit {

  customerDataForm !: FormGroup;
  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder, private api: CustomersApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<CustomersDialogComponent>) { }

  //initialize all the data for the form 
  ngOnInit(): void {
    this.customerDataForm = this.formBuilder.group({
      id:[''],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      address:['', Validators.required],
      phoneNumber:['', Validators.required],
      email:['', Validators.required]
    });
    if(this.editData){
      this.actionBtn = "Update"
      this.customerDataForm.controls['id'].setValue(this.editData.id);
      this.customerDataForm.controls['firstName'].setValue(this.editData.firstName);
      this.customerDataForm.controls['lastName'].setValue(this.editData.lastName);
      this.customerDataForm.controls['address'].setValue(this.editData.address);
      this.customerDataForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.customerDataForm.controls['email'].setValue(this.editData.email);
    }
  }

  //add a customer to our data 
  addCustomer(){
    if(!this.editData){
      if(this.customerDataForm.valid) {
        this.api.saveCustomer(this.customerDataForm.value)
        .subscribe((res) =>{
            alert("Customer added!");
            this.customerDataForm.reset();
            this.dialogRef.close('Save');
          }
        )
      }
    }else{
      this.updateCustomer()
    }
  }
//update customer using data from the form 
  updateCustomer(){
    this.api.updateCustomer(this.customerDataForm.value, this.editData.id)
    .subscribe((res)=>{
      this.customerDataForm.reset();
      this.dialogRef.close('Update');
    })
}
  

}
