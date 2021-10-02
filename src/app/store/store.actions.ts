import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const addProduct = createAction(
  '[Car Shop] AddProduct',
  props<{ product: Product }>()
);

export const setProduct = createAction(
  '[List Product] SetProduct',
  props<{ product: Product[] }>()
);
