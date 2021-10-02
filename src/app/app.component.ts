import { ProductsService } from './service/products.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Product } from './models/product.model';
import { setProduct } from './store/store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  listProducts: Product[] = [];

  categorys: any[] = [
    {
      DepartamentName: "TODOS"
    },
    {
      DepartamentName: "LACTEOS"
    },
    {
      DepartamentName: "ABARROTES"
    },
    {
      DepartamentName: "BEBIDAS NO ALCOHOLICAS"
    }
  ];

  constructor(
    private modalService: NgbModal,
    private store: Store<{data: Product[], product: Product[]}>,
    private service: ProductsService
  ){}

  ngOnInit(): void {
    this.store.select('data').subscribe(data => {
      this.listProducts = data
    })
  }

  openModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  priceTotal():number{
    return this.listProducts.reduce((accum, curr) => accum + curr.Price, 0)
  }

  filterProductForCategory(category:string, offset:number){
    if (category.trim() === "TODOS") {
      this.service.getProducts(0).subscribe(
        (res: any) => {
          if (res.status === 'success') {
            this.store.dispatch(setProduct({product: res.data}))
          } else {
            alert(res.msj)
          }
        },
        (err: any) => {
          alert("Ocurrió un error al procesar la solicitud");
        }
      )

    } else {
      this.service.getProductsForCategorys(category, offset).subscribe(
        (res: any) => {
          if (res.status === 'success') {
            this.store.dispatch(setProduct({product: res.data}))
          } else {
            alert(res.msj)
          }
        },
        (err: any) => {
          alert("Ocurrió un error al procesar la solicitud");
        }
      )
    }
  }
}
