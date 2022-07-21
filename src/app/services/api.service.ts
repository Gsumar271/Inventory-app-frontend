import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  findAll() {
    return this.http.get(environment.apiUrl + 'products/');
  }

  findById(id :Number) {
    return this.http.get(environment.apiUrl + 'products/' + id);
  }

  saveProduct(data: any){
    return this.http.post<any>(environment.apiUrl + 'products/', data)
  }
  
  updateProduct(data:any, id:number){
    return this.http.put<any>(environment.apiUrl + 'products/' +id, data)
  }

  deleteProduct(id:number){
    return this.http.delete<any>(environment.apiUrl + 'products/' +id)
  }

}
