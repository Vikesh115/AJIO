// pages/Wishlist.jsx
import { useSelector, useDispatch } from 'react-redux';
import {
    selectWishlistItems,
    removeFromWishlist,
    moveToCart
} from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Wishlist = () => {
    const wishlistItems = useSelector(selectWishlistItems);
    const dispatch = useDispatch();

    if (wishlistItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-6">You haven't added any items to your wishlist yet.</p>
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
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Wishlist</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <Link
                                    to={`/product/${item.id}`}
                                    className="text-lg font-medium text-gray-900 hover:text-blue-600"
                                >
                                    {item.title}
                                </Link>
                                <button
                                    onClick={() => dispatch(removeFromWishlist(item.id))}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="w-full h-48 mb-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">${item.price}</span>
                                <button
                                    onClick={() => {
                                        dispatch(moveToCart(item.id));
                                        dispatch(addToCart(item));
                                    }}
                                    className="flex items-center text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition duration-200"
                                >
                                    <ShoppingCartIcon className="h-4 w-4 mr-1" />
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;