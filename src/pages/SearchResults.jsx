import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { selectAllProducts } from '../features/products/productsSlice';
import { useSelector } from 'react-redux';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [searchResults, setSearchResults] = useState([]);
    const allProducts = useSelector(selectAllProducts);

    useEffect(() => {
        if (query) {
            const results = allProducts.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        }
    }, [query, allProducts]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Search Results for "{query}"
            </h1>
            
            {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                        No products found matching your search.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;