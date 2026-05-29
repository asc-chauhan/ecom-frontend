import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics } from '../../../store/action';
import { FaBoxOpen, FaShoppingCart, FaDollarSign, FaArrowRight } from 'react-icons/fa';
import { MdCategory, MdStorefront } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { formatRevenue } from '../../../utils/formatPrice';

const StatCard = ({ title, amount, Icon, gradient, revenue = false }) => {
  const displayAmount = revenue ? `$${formatRevenue(Number(amount).toFixed(2))}` : amount;
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ${gradient} min-w-[220px] flex-1`}>
      <div className="absolute top-0 right-0 opacity-10">
        <Icon className="text-[120px] -mt-4 -mr-4" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="text-xl" />
          <span className="text-sm font-medium uppercase tracking-wide opacity-90">{title}</span>
        </div>
        <h2 className="text-3xl font-bold mt-2">{displayAmount}</h2>
      </div>
    </div>
  );
};

const QuickAction = ({ title, description, Icon, to }) => (
  <Link to={to} className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 bg-white">
    <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
      <Icon className="text-xl" />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
    <FaArrowRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
  </Link>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { productCount, totalOrders, totalRevenue, loading, error } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ThreeDots height="50" width="50" color="#6366f1" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <button
            onClick={() => dispatch(fetchAnalytics())}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stat Cards */}
      <div className="flex flex-wrap gap-5">
        <StatCard
          title="Total Products"
          amount={productCount}
          Icon={FaBoxOpen}
          gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
        />
        <StatCard
          title="Total Orders"
          amount={totalOrders}
          Icon={FaShoppingCart}
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
        />
        <StatCard
          title="Revenue"
          amount={totalRevenue}
          Icon={FaDollarSign}
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
          revenue={true}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <QuickAction
            title="Manage Products"
            description="Add, edit, or remove products from your store"
            Icon={FaBoxOpen}
            to="/admin/products"
          />
          <QuickAction
            title="Manage Categories"
            description="Organize products into categories"
            Icon={MdCategory}
            to="/admin/categories"
          />
          <QuickAction
            title="View Orders"
            description="Track and manage customer orders"
            Icon={FaShoppingCart}
            to="/admin/orders"
          />
          <QuickAction
            title="Manage Sellers"
            description="View and manage seller accounts"
            Icon={MdStorefront}
            to="/admin/sellers"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
