import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaShieldAlt, FaShoppingCart, FaMapMarkerAlt, FaEdit, FaHeart, FaCog } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { getUserAddresses } from '../../store/action';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, address } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 h-36" />

      <div className="lg:px-14 sm:px-8 px-4 max-w-6xl mx-auto -mt-16 relative z-10 pb-12">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border-4 border-white -mt-12 sm:-mt-16">
              <span className="text-white text-4xl font-bold">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>

            {/* Name & Role */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-800">{user?.username}</h1>
              <p className="text-slate-500 text-sm mt-0.5">{user?.email || 'No email provided'}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
                  {user?.roles?.includes('ROLE_ADMIN') ? '👑 Admin' : user?.roles?.includes('ROLE_SELLER') ? '🏪 Seller' : '🛒 Customer'}
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                  Member #{user?.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Link to="/profile/orders" className="group bg-white rounded-xl border border-slate-200 p-5 text-center hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 mx-auto bg-indigo-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition">
              <FaShoppingCart className="text-indigo-600 text-lg" />
            </div>
            <p className="font-semibold text-slate-800 text-sm">My Orders</p>
            <p className="text-xs text-slate-400 mt-0.5">Track orders</p>
          </Link>

          <Link to="/cart" className="group bg-white rounded-xl border border-slate-200 p-5 text-center hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 mx-auto bg-emerald-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition">
              <MdLocalShipping className="text-emerald-600 text-xl" />
            </div>
            <p className="font-semibold text-slate-800 text-sm">Cart</p>
            <p className="text-xs text-slate-400 mt-0.5">View cart</p>
          </Link>

          <Link to="/products" className="group bg-white rounded-xl border border-slate-200 p-5 text-center hover:shadow-lg hover:border-amber-200 hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 mx-auto bg-amber-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-amber-100 transition">
              <FaHeart className="text-amber-600 text-lg" />
            </div>
            <p className="font-semibold text-slate-800 text-sm">Shop</p>
            <p className="text-xs text-slate-400 mt-0.5">Browse products</p>
          </Link>

          <div className="group bg-white rounded-xl border border-slate-200 p-5 text-center hover:shadow-lg hover:border-purple-200 hover:-translate-y-1 transition-all duration-200 cursor-pointer">
            <div className="w-12 h-12 mx-auto bg-purple-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-100 transition">
              <FaCog className="text-purple-600 text-lg" />
            </div>
            <p className="font-semibold text-slate-800 text-sm">Settings</p>
            <p className="text-xs text-slate-400 mt-0.5">Preferences</p>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Saved Addresses</h3>
              <p className="text-sm text-slate-500 mt-0.5">Your delivery addresses</p>
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {address?.length || 0} saved
            </span>
          </div>

          {address && address.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {address.map((addr, index) => (
                <div
                  key={addr.addressId}
                  className="relative border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
                >
                  {index === 0 && (
                    <span className="absolute -top-2 left-4 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase rounded-full">
                      Default
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg mt-0.5">
                      <FaMapMarkerAlt className="text-indigo-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">
                        {addr.buildingName || addr.street}
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {addr.street && `${addr.street}, `}
                        {addr.city && `${addr.city}, `}
                        {addr.state && `${addr.state}`}
                        {addr.pincode && ` - ${addr.pincode}`}
                      </p>
                      {addr.country && (
                        <p className="text-xs text-slate-400 mt-1 font-medium">{addr.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="text-2xl text-slate-300" />
              </div>
              <p className="font-medium text-slate-600">No addresses saved yet</p>
              <p className="text-sm mt-1">Addresses will be saved when you checkout</p>
              <Link to="/products" className="mt-4 px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
