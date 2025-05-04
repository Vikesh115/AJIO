// features/cart/cartSlice.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import cartReducer, {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    selectCartItems,
    selectCartTotal
} from './cartSlice';

describe('cartSlice', () => {
    const initialState = {
        items: []
    };

    const mockProduct = {
        id: 1,
        title: 'Test Product',
        price: 10.99,
        image: 'test-image.jpg'
    };

    const mockProduct2 = {
        id: 2,
        title: 'Test Product 2',
        price: 15.99,
        image: 'test-image2.jpg'
    };

    // Mock localStorage
    beforeEach(() => {
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };
        global.localStorage = localStorageMock;
    });

    describe('reducers', () => {
        it('should handle initial state', () => {
            expect(cartReducer(undefined, {})).toEqual(initialState);
        });

        it('should handle addToCart with new product', () => {
            const action = addToCart(mockProduct);
            const state = cartReducer(initialState, action);
            expect(state.items).toEqual([{ ...mockProduct, quantity: 1 }]);
        });

        it('should handle addToCart with existing product', () => {
            const initialStateWithProduct = {
                items: [{ ...mockProduct, quantity: 1 }]
            };
            const action = addToCart(mockProduct);
            const state = cartReducer(initialStateWithProduct, action);
            expect(state.items[0].quantity).toBe(2);
        });

        it('should handle removeFromCart', () => {
            const initialStateWithProducts = {
                items: [
                    { ...mockProduct, quantity: 1 },
                    { ...mockProduct2, quantity: 1 }
                ]
            };
            const action = removeFromCart(mockProduct.id);
            const state = cartReducer(initialStateWithProducts, action);
            expect(state.items).toEqual([{ ...mockProduct2, quantity: 1 }]);
        });

        it('should handle increaseQuantity', () => {
            const initialStateWithProduct = {
                items: [{ ...mockProduct, quantity: 1 }]
            };
            const action = increaseQuantity(mockProduct.id);
            const state = cartReducer(initialStateWithProduct, action);
            expect(state.items[0].quantity).toBe(2);
        });

        it('should handle decreaseQuantity', () => {
            const initialStateWithProduct = {
                items: [{ ...mockProduct, quantity: 2 }]
            };
            const action = decreaseQuantity(mockProduct.id);
            const state = cartReducer(initialStateWithProduct, action);
            expect(state.items[0].quantity).toBe(1);
        });

        it('should not decrease quantity below 1', () => {
            const initialStateWithProduct = {
                items: [{ ...mockProduct, quantity: 1 }]
            };
            const action = decreaseQuantity(mockProduct.id);
            const state = cartReducer(initialStateWithProduct, action);
            expect(state.items[0].quantity).toBe(1);
        });

        it('should handle clearCart', () => {
            const initialStateWithProducts = {
                items: [
                    { ...mockProduct, quantity: 2 },
                    { ...mockProduct2, quantity: 1 }
                ]
            };
            const action = clearCart();
            const state = cartReducer(initialStateWithProducts, action);
            expect(state.items).toEqual([]);
        });
    });

    describe('selectors', () => {
        it('should select cart items', () => {
            const state = {
                cart: {
                    items: [
                        { ...mockProduct, quantity: 1 },
                        { ...mockProduct2, quantity: 2 }
                    ]
                }
            };
            expect(selectCartItems(state)).toEqual(state.cart.items);
        });

        it('should calculate cart total', () => {
            const state = {
                cart: {
                    items: [
                        { ...mockProduct, quantity: 2 },  // 10.99 * 2 = 21.98
                        { ...mockProduct2, quantity: 1 }  // 15.99 * 1 = 15.99
                    ]
                }
            };
            // 21.98 + 15.99 = 37.97
            expect(selectCartTotal(state)).toBeCloseTo(37.97);
        });

        it('should return 0 for empty cart', () => {
            const state = {
                cart: {
                    items: []
                }
            };
            expect(selectCartTotal(state)).toBe(0);
        });
    });

    describe('localStorage integration', () => {
        beforeEach(() => {
            localStorage.clear();
            vi.clearAllMocks();
        });

        it('should save to localStorage on addToCart', () => {
            const action = addToCart(mockProduct);
            const state = cartReducer(initialState, action);

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify(state.items)
            );
        });

        it('should save to localStorage on removeFromCart', () => {
            const initialStateWithProducts = {
                items: [
                    { ...mockProduct, quantity: 1 },
                    { ...mockProduct2, quantity: 1 }
                ]
            };
            const action = removeFromCart(mockProduct.id);
            const state = cartReducer(initialStateWithProducts, action);

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify(state.items)
            );
        });

        it('should save to localStorage on clearCart', () => {
            const initialStateWithProducts = {
                items: [
                    { ...mockProduct, quantity: 1 },
                    { ...mockProduct2, quantity: 1 }
                ]
            };
            const action = clearCart();
            const state = cartReducer(initialStateWithProducts, action);

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'cart',
                JSON.stringify(state.items)
            );
        });
    });
});