import React, { useState } from 'react';
import axios from 'axios';
import { ShoppingBag, Loader2 } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import { Product, SearchResponse } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResponse>(
        'https://real-time-product-search.p.rapidapi.com/search-v2',
        {
          params: {
            q: query,
            country: 'us',
            language: 'en',
            page: '1',
            limit: '10',
            sort_by: 'BEST_MATCH'
          },
          headers: {
            'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com',
            'x-rapidapi-key': '18695320e8msh05caef663ee1b62p101ab6jsn67ff442e075a'
          }
        }
      );

      setProducts(response.data.products);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Product Search Engine
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Search across multiple platforms to find the best deals
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <SearchBar onSearch={searchProducts} isLoading={isLoading} />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 py-8">
            {error}
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="text-center text-gray-600 py-12">
            No products found. Try searching for something!
          </div>
        )}
      </div>
    </div>
  );
}

export