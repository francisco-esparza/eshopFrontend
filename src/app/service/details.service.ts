import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor( private http: HttpClient) { }

  getProduct(id: any){
    return this.http.get(`${environment.baseUrl}/v1/products/detail`,{
      params:{
        ID_PRODUCT: id
      }
    })
  }
}
