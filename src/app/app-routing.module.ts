import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SuppliersComponent } from './suppliers/suppliers.component';


const routes: Routes = [
  {
    path : 'suppliers', component: SuppliersComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path : 'customers', component: CustomersComponent
  },
  {
    path: 'orders', component: OrdersComponent
  },
  {
    path: 'main_page', component: MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
