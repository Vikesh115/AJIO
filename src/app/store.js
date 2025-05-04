// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
    }
});

console.log(store.getState());