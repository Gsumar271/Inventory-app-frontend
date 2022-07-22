import { AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { SuppliersApiService } from '../services/suppliers-api.service';
import { SuppliersDialogComponent } from '../suppliers-dialog/suppliers-dialog.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  title = 'Suppliers'
  displayedColumns: string[] = ['id', 'name', 'address', 'phoneNumber', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private api: SuppliersApiService) { }

  ngOnInit(): void {
    this.getAllSuppliers()
  }
  openDialog() {
    this.dialog.open(SuppliersDialogComponent, {
      width:'35%'
    }).afterClosed().subscribe(val=>{
      if(val==='Save'){
        this.getAllSuppliers();
      }
    }) 
  }

  getAllSuppliers(){
    this.api.findAll()
    .subscribe((res)=>{
        this.dataSource = new MatTableDataSource(<any>res);
      }
    )
  }
  
  editSupplier(row: any){
    this.dialog.open(SuppliersDialogComponent, {
      width:'35%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==='Update'){
        this.getAllSuppliers();
      }
    })

  }


  deleteSupplier(id:number){
    this.api.deleteSupplier(id)
      .subscribe((res)=>{
        this.getAllSuppliers()
      }
    )

  }


}
