import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCategories } from '../features/categories/categoriesSlice';
import { setCategory } from '../features/categories/categoriesSlice';
import { selectCartItems } from '../features/cart/cartSlice';
import { selectWishlistItems } from '../features/wishlist/wishlistSlice';
import { ShoppingBagIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const categories = useSelector(selectAllCategories);
    const [searchQuery, setSearchQuery] = useState('');

    const cartItems = useSelector(selectCartItems);
    const wishlistItems = useSelector(selectWishlistItems);
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const wishlistItemCount = wishlistItems.length;

    const categoryPaths = {
        "all": "/",
        "men's clothing": "/shop/mens-clothing",
        "women's clothing": "/shop/womens-clothing",
        "jewelery": "/shop/jewelry",
        "electronics": "/shop/electronics"
    };

    const isActiveCategory = (category) => {
        return location.pathname === categoryPaths[category];
    };

    const handleCategoryChange = (category) => {
        dispatch(setCategory(category));
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link
                    to="/"
                    className="text-white font-bold text-xl mb-4 md:mb-0"
                    onClick={() => handleCategoryChange('all')}
                >
                    AJIO
                </Link>

                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {categories.map((category) => {
                        const displayName = category === 'all' ? 'Home' :
                            category === "men's clothing" ? "Men's" :
                                category === "women's clothing" ? "Women's" :
                                    category.charAt(0).toUpperCase() + category.slice(1);

                        return (
                            <Link
                                key={category}
                                to={categoryPaths[category]}
                                className={`px-2 py-1 rounded-md text-xs font-medium ${isActiveCategory(category)
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                    }`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {displayName}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex flex-col space-y-2 w-full md:w-auto md:items-start items-end md:ml-4">
                    {/* Auth Section */}
                    <div className="flex space-x-2">
                        {currentUser ? (
                            <>
                                <span className="text-gray-300 text-sm">Hi, {currentUser.email.split("@")[0]}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-white text-xs border border-gray-500 px-3 py-1 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className='flex items-center text-xs gap-1'>
                                <Link to="/login" className="text-gray-300 hover:text-white">
                                    Login
                                </Link>
                                <span className='flex items-center text-white '>/</span>
                                <Link to="/signup" className="text-gray-300 hover:text-white">
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="w-full md:w-60">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more"
                                className="w-full py-2 px-4 pr-10 rounded-md text-sm text-gray-900 focus:outline-none bg-amber-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center space-x-4 mt-4 md:mb-0">
                    <Link to="/wishlist" className="relative text-gray-300 hover:text-white">
                        <HeartIcon className="h-5 w-5" />
                        {wishlistItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {wishlistItemCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/cart" className="relative text-gray-300 hover:text-white">
                        <ShoppingBagIcon className="h-5 w-5" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;