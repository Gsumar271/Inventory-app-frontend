import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersApiService {

  http :HttpClient;

  constructor(http: HttpClient) {
    this.http = http; 
   }


  findAll(): Observable<any> {
    return this.http.get(environment.apiUrl + 'customers/');
  }

  findById(id :Number): Observable<any> {
    return this.http.get(environment.apiUrl + 'customers/' + id);
  }

  saveCustomer(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'customers/', data)
  }
  
  updateCustomer(data:any, id:number): Observable<any> {
    return this.http.put<any>(environment.apiUrl + 'customers/' +id, data)
  }

  deleteCustomer(id:number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + 'customers/' +id)
  }
}
