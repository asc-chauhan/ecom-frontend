import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../store/action';
import { FaBoxOpen } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { formatPrice } from '../../../utils/formatPrice';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts('pageNumber=0&pageSize=20'));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ThreeDots height="50" width="50" color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Products</h1>
        <p className="text-slate-500 text-sm mt-1">
          {products?.length || 0} products listed
        </p>
      </div>

      {/* Product Grid */}
      {products && products.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="h-40 bg-slate-100 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaBoxOpen className="text-4xl text-slate-300" />
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-slate-800 truncate">
                  {product.productName}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {product.description || 'No description'}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    {product.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-emerald-600">
                          {formatPrice(product.specialPrice)}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-slate-800">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    product.quantity > 0
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <FaBoxOpen className="text-5xl mb-3" />
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
