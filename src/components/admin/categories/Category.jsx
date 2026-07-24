import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/action';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import api from '../../../api/api';
import toast from 'react-hot-toast';

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const { categoryLoader } = useSelector((state) => state.errors);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    setSubmitting(true);
    try {
      if (editingCategory) {
        await api.put(`/admin/categories/${editingCategory.categoryId}`, {
          categoryName: categoryName,
        });
        toast.success('Category updated');
      } else {
        await api.post('/admin/categories', { categoryName: categoryName });
        toast.success('Category created');
      }
      dispatch(fetchCategories());
      closeModal();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.delete(`/admin/categories/${categoryId}`);
      toast.success('Category deleted');
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete');
    }
  };

  const openEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.categoryName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  if (categoryLoader) {
    return (
      <div className="flex justify-center items-center h-64">
        <ThreeDots height="50" width="50" color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
          <p className="text-slate-500 text-sm mt-1">
            {categories?.length || 0} categories total
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm"
        >
          <FaPlus className="text-sm" />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.categoryId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">#{cat.categoryId}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {cat.categoryName}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(cat)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.categoryId)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-slate-400">
                  No categories found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingCategory ? 'Edit Category' : 'New Category'}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                autoFocus
              />
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
