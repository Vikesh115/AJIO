// pages/Shop/Womens.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../features/products/productsSlice';
import { selectAllProducts, selectProductsStatus } from '../../features/products/productsSlice';
import ProductCard from '../../components/ProductCard';

const Womens = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductsStatus);

    useEffect(() => {
        dispatch(fetchProductsByCategory("women's clothing"));
    }, [dispatch]);

    if (status === 'loading') return (
        <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading women's products...</p>
        </div>
    );

    if (status === 'failed') return (
        <div className="text-center py-8 text-red-500">
            Failed to load women's products. Please try again later.
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Women's Clothing</h1>
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No women's products available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Womens;