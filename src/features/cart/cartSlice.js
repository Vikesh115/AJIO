// features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
const loadCartFromStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) return [];
        return JSON.parse(serializedState);
    } catch (err) {
        console.warn("Couldn't load cart from localStorage", err);
        return [];
    }
};

const initialState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
    },
});

// ... rest of the exports remain the same ...

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) =>
    state.cart.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

export default cartSlice.reducer;