// features/wishlist/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
const loadWishlistFromStorage = () => {
    try {
        const serializedState = localStorage.getItem('wishlist');
        if (serializedState === null) return [];
        return JSON.parse(serializedState);
    } catch (err) {
        console.warn("Couldn't load wishlist from localStorage", err);
        return [];
    }
};

const initialState = {
    items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (!existingItem) {
                state.items.push(action.payload);
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
        moveToCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
    },
});

export const { addToWishlist, removeFromWishlist, moveToCart } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;

export default wishlistSlice.reducer;