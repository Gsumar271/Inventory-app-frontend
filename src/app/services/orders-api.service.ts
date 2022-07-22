import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  http :HttpClient;

  constructor(http: HttpClient) {
    this.http = http; 
   }


  findAll(): Observable<any> {
    return this.http.get(environment.apiUrl + 'orders/');
  }

  findById(id :Number): Observable<any> {
    return this.http.get(environment.apiUrl + 'orders/' + id);
  }

  saveOrder(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'orders/', data)
  }
  
  updateOrder(data:any, id:number): Observable<any> {
    return this.http.put<any>(environment.apiUrl + 'orders/' +id, data)
  }

  deleteOrder(id:number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + 'orders/' +id)
  }
}
