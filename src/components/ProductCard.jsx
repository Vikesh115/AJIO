// components/ProductCard.jsx
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, selectWishlistItems } from '../features/wishlist/wishlistSlice';
import { Link } from 'react-router-dom';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(selectWishlistItems);
    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
            <button
                onClick={toggleWishlist}
                className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full hover:bg-white"
            >
                {isInWishlist ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                    <HeartIconOutline className="h-6 w-6 text-gray-600 hover:text-red-500" />
                )}
            </button>
            <Link to={`/product/${product.id}`}>
                <div className="h-48 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-4"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.title}
                    </h3>
                    <div className="flex items-center mb-2">
                        <span className="text-yellow-500">
                            {'★'.repeat(Math.round(product.rating.rate))}
                            {'☆'.repeat(5 - Math.round(product.rating.rate))}
                        </span>
                        <span className="text-gray-600 text-sm ml-2">
                            ({product.rating.count})
                        </span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">${product.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;