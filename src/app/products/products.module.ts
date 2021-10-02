import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class ProductsModule { }
