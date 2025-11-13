
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group">
      <div className="relative">
        <img className="h-56 w-full object-cover" src={product.imageUrl} alt={product.name} />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 truncate">{product.name}</h3>
        <p className="text-slate-500 mt-1 text-sm h-10 overflow-hidden">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onViewDetails(product)}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
