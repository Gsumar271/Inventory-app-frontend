import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = 'Products'
  displayedColumns: string[] = ['id', 'name', 'desc', 'supplierId', 'itemPrice', 'salesPrice','quantity', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width:'35%'
    }).afterClosed().subscribe(val=>{
      if(val==='Save'){
        this.getAllProducts();
      }
    }) 
  }

  getAllProducts(){
    this.api.findAll()
    .subscribe((res)=>{
        this.dataSource = new MatTableDataSource(<any>res);
      }
    )
  }

  editProduct(row: any){
    this.dialog.open(ProductDialogComponent, {
      width:'35%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==='Update'){
        this.getAllProducts();
      }
    })

  }


  deleteProduct(id:number){
    this.api.deleteProduct(id)
      .subscribe((res)=>{
        this.getAllProducts()
      }
    )

  }

}
