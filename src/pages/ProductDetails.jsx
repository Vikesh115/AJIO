// pages/ProductDetails.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, selectProductDetails, selectProductsStatus } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { StarIcon } from '@heroicons/react/24/solid';
import { addToWishlist, removeFromWishlist, selectWishlistItems } from '../features/wishlist/wishlistSlice';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector(selectProductDetails);
    const status = useSelector(selectProductsStatus);
    const wishlistItems = useSelector(selectWishlistItems);

    useEffect(() => {
        dispatch(fetchProductById(id));

        return () => {
            dispatch({ type: 'products/resetCurrentProduct' });
        };
    }, [dispatch, id]);

    const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

    const toggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    if (status === 'loading') return (
        <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading product details...</p>
        </div>
    );

    if (status === 'failed') return (
        <div className="text-center py-32 text-red-500">
            Failed to load product details. Please try again later.
        </div>
    );

    if (!product) return (
        <div className="text-center py-32">
            Product not found
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 p-8">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-auto max-h-96 object-contain"
                        />
                    </div>
                    <div className="md:w-1/2 p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                        <div className="flex items-center mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? 'text-yellow-500' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm ml-2">
                                ({product.rating.count} reviews)
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-6">${product.price}</p>
                        <p className="text-gray-700 mb-6">{product.description}</p>
                        <div className="mb-6">
                            <span className="text-gray-600">Category: </span>
                            <span className="font-medium capitalize">{product.category}</span>
                        </div>
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={toggleWishlist}
                            className={`mt-4 w-full flex items-center justify-center py-2 px-4 rounded-lg border ${isInWishlist
                                ? 'bg-red-50 border-red-200 text-red-600'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {isInWishlist ? (
                                <>
                                    <HeartIconSolid className="h-5 w-5 mr-2" />
                                    Remove from Wishlist
                                </>
                            ) : (
                                <>
                                    <HeartIconOutline className="h-5 w-5 mr-2" />
                                    Add to Wishlist
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;