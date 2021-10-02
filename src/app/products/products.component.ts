import { addProduct, setProduct } from './../store/store.actions';
import { ProductsService } from './../service/products.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  pathImg: string = environment.baseUrl;
  constructor(
    private service: ProductsService,
    private store: Store<{data: Product[], product: Product[]}>,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getListOfProducts(0);
    this.store.select('product').subscribe((product: Product[]) => {
      this.products = product;
    })
  }

  getListOfProducts(offset: number): void{
    this.loading = true;
    this.service.getProducts(offset).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status === 'success') {
          this.store.dispatch(setProduct({product: res.data}))
        } else {
          alert(res.msj);
        }
      },
      (err: any) => {
        this.loading = false;
        alert(err.message)
      }
    )
  }

  addProduct(id: number):void {
    const product = this.products.find((e:Product) => e.IdProduct === id);
    if (product) {
      this.store.dispatch(addProduct({product: product}))
    }
  }

  viewDetail(id: number):void {
    this.route.navigate(['/details/'+id])
  }
}
