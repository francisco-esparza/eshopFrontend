import { addProduct } from './../store/store.actions';
import { Product } from './../models/product.model';
import { environment } from './../../environments/environment';
import { DetailsService } from './../service/details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  loading: boolean = false;
  product:any;
  pathImg: string = environment.baseUrl;
  constructor(
    private router: Router,
    private params: ActivatedRoute,
    private service: DetailsService,
    private store: Store<{data: Product[]}>
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.params.snapshot.params.id);
    this.getDetailProduct(id);
  }

  getDetailProduct(id: number){
    this.loading = true;
    this.service.getProduct(id).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status === 'success') {
          this.product = res.data;
        } else {
          alert(res.msj);
        }
      },
      (err: any) => {
        this.loading = false;
        alert(err.message);
      }
    )
  }

  addProduct(product:Product) {
    this.store.dispatch(addProduct({product: product}))
  }

  return () {
    this.router.navigate(['/'])
  }
}
