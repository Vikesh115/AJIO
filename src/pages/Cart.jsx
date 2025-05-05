// pages/Cart.jsx
import { useSelector, useDispatch } from 'react-redux';
import {
    selectCartItems,
    selectCartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
} from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const Cart = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    console.log(cartItems);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <div key={item.id} className="p-4 flex">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img
                                            src={item?.image}
                                            alt={item.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="ml-4 flex-grow">
                                        <div className="flex justify-between">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                <Link to={`/product/${item.id}`}>{item.title}</Link>
                                            </h3>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{item?.category?.name}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => dispatch(decreaseQuantity(item.id))}
                                                    disabled={item.quantity <= 1}
                                                    className={`p-1 rounded-md ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                                                >
                                                    <MinusIcon className="h-4 w-4" />
                                                </button>
                                                <span className="mx-2 text-gray-700">{item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch(increaseQuantity(item.id))}
                                                    className="p-1 text-gray-600 hover:bg-gray-100 rounded-md"
                                                >
                                                    <PlusIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="text-lg font-medium text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                <div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-900">Free</span>
                        </div>
                        <div className="border-t border-gray-200 my-4"></div>
                        <div className="flex justify-between text-lg font-medium text-gray-900 mb-6">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                        >
                            Checkout
                        </button>
                    </div>

                    <div className="mt-4">
                        <Link
                            to="/"
                            className="block text-center text-blue-600 hover:text-blue-800 font-medium py-2"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;