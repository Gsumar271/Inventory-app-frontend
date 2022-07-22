import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuppliersApiService {

http :HttpClient;

  constructor(http: HttpClient) {
    this.http = http; 
   }


  findAll(): Observable<any> {
    return this.http.get(environment.apiUrl + 'suppliers/');
  }

  findById(id :Number): Observable<any> {
    return this.http.get(environment.apiUrl + 'suppliers/' + id);
  }

  saveSupplier(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'suppliers/', data)
  }
  
  updateSupplier(data:any, id:number): Observable<any> {
    return this.http.put<any>(environment.apiUrl + 'suppliers/' +id, data)
  }

  deleteSupplier(id:number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + 'suppliers/' +id)
  }

}
