// features/categories/categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentCategory: 'all',
    categories: ['all', "men's clothing", "women's clothing", 'jewelery', 'electronics']
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.currentCategory = action.payload;
        }
    }
});

export const { setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

// Selectors
export const selectCurrentCategory = (state) => state.categories.currentCategory;
export const selectAllCategories = (state) => state.categories.categories;