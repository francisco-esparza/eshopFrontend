import { addProduct, setProduct } from './store.actions';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.model';

export const initialState:Product[] = [];
export const intialStateProduct: Product[] = [];

const _carReducer = createReducer(
  initialState,
  on(addProduct, (state, actions) => state.concat(actions.product))
);

const _productReducer = createReducer(
  intialStateProduct,
  on(setProduct, (state, actions) => actions.product)
);

export function carReducer(state:any, action: any) {
  return _carReducer(state, action);
}

export function productReduces(state:any, action: any) {
  return _productReducer(state, action);
}

