import { configureStore } from '@reduxjs/toolkit'
import { productApi } from '../features/products/products';
import { brandApi } from '../features/brand/brand';
import { cartApi } from '../features/cart/cart';
import { orderApi } from '../features/order/order';
import { userApi } from '~/redux/services/userApi';
import { categoryApi } from '../features/category/category';
import { subCategoryItemApi } from '../features/subCategoryItem/subCategoryItem';



export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: userApi.reducer,
    [subCategoryItemApi.reducerPath]: subCategoryItemApi.reducer,
  
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        productApi.middleware,
        brandApi.middleware,
        cartApi.middleware,
        orderApi.middleware,
        userApi.middleware,
        categoryApi.middleware,
        subCategoryItemApi.middleware,
      
    ),
});