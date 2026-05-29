import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaCheckCircle, FaBox } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import api from '../../api/api';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/order/users/my-orders');
      setOrders(data || []);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to fetch orders');
      setOrders([]);
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
    <div className="lg:px-14 sm:px-8 px-4 py-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Orders</h1>
        <p className="text-slate-500 mt-1">
          {orders.length > 0 ? `${orders.length} orders placed` : 'Track your order history here'}
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Order Info */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <FaBox className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Order #{order.orderId}</p>
                    <p className="text-sm text-slate-500">{order.orderDate}</p>
                  </div>
                </div>

                {/* Items Count */}
                <div className="text-sm text-slate-600">
                  {order.orderItems?.length || 0} items
                </div>

                {/* Total */}
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-800">
                    ${Number(order.totalAmount).toFixed(2)}
                  </p>
                </div>

                {/* Status */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <FaCheckCircle className="text-[10px]" />
                  {order.orderStatus}
                </span>
              </div>

              {/* Order Items Preview */}
              {order.orderItems && order.orderItems.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-3">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg">
                        {item.productName || `Item ${idx + 1}`} × {item.quantity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <FaShoppingCart className="text-5xl mb-3" />
          <p className="text-lg font-medium">No orders yet</p>
          <p className="text-sm mt-1">Your order history will appear here after your first purchase.</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
