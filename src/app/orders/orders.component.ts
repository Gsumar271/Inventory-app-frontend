import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
import { OrdersApiService } from '../services/orders-api.service';
import { OrdersDialogComponent } from '../orders-dialog/orders-dialog.component';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  title = 'Orders'
  displayedColumns: string[] = ['id', 'type', 'productName', 'supplierOrCustomer', 'orderQuantity','itemPrice','note', 'action'];
  dataSource!: MatTableDataSource<any>;


  constructor(public dialog: MatDialog, private api: OrdersApiService) { }

  ngOnInit(): void {
    this.getAllOrders()
  }
  openDialog() {
    this.dialog.open(OrdersDialogComponent, {
      width:'35%'
    }).afterClosed().subscribe(val=>{
      if(val==='Save'){
        this.getAllOrders();
      }
    }) 
  }

  getAllOrders(){
    this.api.findAll()
    .subscribe((res)=>{
        this.dataSource = new MatTableDataSource(<any>res);
      }
    )
  }
  
  editOrder(row: any){
    this.dialog.open(OrdersDialogComponent, {
      width:'35%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==='Update'){
        this.getAllOrders();
      }
    })

  }


  deleteOrder(id:number){
    this.api.deleteOrder(id)
      .subscribe((res)=>{
        this.getAllOrders()
      }
    )

  }

  convertDate(date:number){
    var newDate = new Date(date * 1000);
    return newDate.getDate;

  }

}
