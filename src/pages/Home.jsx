// pages/Home.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { selectAllProducts, selectProductsStatus } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductsStatus);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') return (
        <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading products...</p>
        </div>
    )
    if (status === 'failed') return <div className="text-center py-8 text-red-500">Error loading products</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;