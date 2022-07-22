import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http :HttpClient;

  constructor(http: HttpClient) {
    this.http = http; 
   }


  findAll(): Observable<any> {
    return this.http.get(environment.apiUrl + 'products/');
  }

  findById(id :Number): Observable<any> {
    return this.http.get(environment.apiUrl + 'products/' + id);
  }

  saveProduct(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'products/', data)
  }
  
  updateProduct(data:any, id:number): Observable<any> {
    return this.http.put<any>(environment.apiUrl + 'products/' +id, data)
  }

  deleteProduct(id:number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + 'products/' +id)
  }

}
