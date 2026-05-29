import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaCheckCircle, FaClock, FaTruck } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import api from '../../../api/api';
import toast from 'react-hot-toast';

const statusConfig = {
  'Order Accepted!': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: FaCheckCircle },
  'Pending': { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: FaClock },
  'Shipped': { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaTruck },
};

const getStatusStyle = (status) => {
  return statusConfig[status] || { color: 'bg-slate-50 text-slate-700 border-slate-200', icon: FaShoppingCart };
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/orders');
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
        <p className="text-slate-500 text-sm mt-1">
          {orders.length} total orders
        </p>
      </div>

      {/* Orders Table */}
      {orders.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => {
                  const statusStyle = getStatusStyle(order.orderStatus);
                  const StatusIcon = statusStyle.icon;
                  return (
                    <tr key={order.orderId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                        #{order.orderId}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {order.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {order.orderDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {order.orderItems?.length || 0} items
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                        ${Number(order.totalAmount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusStyle.color}`}>
                          <StatusIcon className="text-[10px]" />
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <FaShoppingCart className="text-5xl mb-3" />
          <p className="text-lg">No orders yet.</p>
          <p className="text-sm">Orders will appear here once customers start purchasing.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
