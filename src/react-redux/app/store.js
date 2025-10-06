import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../features/products/products';
import { brandApi } from '../features/brand/brand';
import { cartApi } from '../features/cart/cart';
import { orderApi } from '../features/order/order';
import { categoryApi } from '../features/category/category';
import { subCategoryItemApi } from '../features/subCategoryItem/subCategoryItem';
import { reviewApi } from '../features/review/review';
import { authApi } from '../features/auth/auth';

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [subCategoryItemApi.reducerPath]: subCategoryItemApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productApi.middleware,
            reviewApi.middleware,
            brandApi.middleware,
            cartApi.middleware,
            orderApi.middleware,
            authApi.middleware,
            categoryApi.middleware,
            subCategoryItemApi.middleware
        ),
});
