import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(offset: any){
    return this.http.get(`${environment.baseUrl}/v1/products`,{
      params: {
        OFFSET: offset,
      }
    });
  }

  getProductsForCategorys(category:string, offset: any){
    return this.http.get(`${environment.baseUrl}/v1/products/category`,{
      params: {
        OFFSET: offset,
        NAME_CATEGORY: category,
      }
    });
  }
}
