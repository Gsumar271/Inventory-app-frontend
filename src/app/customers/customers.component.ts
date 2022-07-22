import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomersApiService } from '../services/customers-api.service';
import { CustomersDialogComponent } from '../customers-dialog/customers-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  title = 'Customers'
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'phoneNumber', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private api: CustomersApiService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  openDialog() {
    this.dialog.open(CustomersDialogComponent, {
      width:'35%'
    }).afterClosed().subscribe(val=>{
      if(val==='Save'){
        this.getAllCustomers();
      }
    }) 
  }

  getAllCustomers(){
    this.api.findAll()
    .subscribe((res)=>{
        this.dataSource = new MatTableDataSource(<any>res);
      }
    )
  }

  editCustomer(row: any){
    this.dialog.open(CustomersDialogComponent, {
      width:'35%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==='Update'){
        this.getAllCustomers();
      }
    })

  }
  //delete a customer
  deleteCustomer(id:number){
    this.api.deleteCustomer(id)
      .subscribe((res)=>{
        this.getAllCustomers()
      }
    )

  }

}
