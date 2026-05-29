import React, { useEffect, useState } from 'react';
import { FaStore, FaUser } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import api from '../../../api/api';
import toast from 'react-hot-toast';

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/sellers');
      setSellers(data || []);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to fetch sellers');
      setSellers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        <h1 className="text-2xl font-bold text-slate-800">Sellers</h1>
        <p className="text-slate-500 text-sm mt-1">
          {sellers.length} registered sellers
        </p>
      </div>

      {/* Sellers List */}
      {sellers.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellers.map((seller, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                  <FaUser className="text-lg" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {seller.username || seller.userName || `Seller #${index + 1}`}
                  </h4>
                  <p className="text-sm text-slate-500">{seller.email || 'No email'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <FaStore className="text-5xl mb-3" />
          <p>No sellers found.</p>
        </div>
      )}
    </div>
  );
};

export default Sellers;
