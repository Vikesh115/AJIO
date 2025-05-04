// features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (category) => {
        const url = category === 'all'
            ? 'https://fakestoreapi.com/products'
            : `https://fakestoreapi.com/products/category/${category}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    }
);

// Add this new thunk for fetching single product
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id) => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        return data;
    }
);

const initialState = {
    items: [],
    status: 'idle',
    currentProduct: null,
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetCurrentProduct: (state) => {
            state.currentProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productsSlice.reducer;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductDetails = (state) => state.products.currentProduct;