import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/action";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

const Products = () => {
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { products, categories, pagination } = useSelector((state) => state.products);

    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10 2xl:w-[90%] 2xl:mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">All Products</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    {pagination?.totalElements
                        ? `${pagination.totalElements} products available`
                        : "Browse our collection"}
                </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                <Filter categories={categories ? categories : []} />
            </div>

            {/* Products Grid */}
            {isLoading ? (
                <Loader />
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-[200px]">
                    <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="min-h-[700px]">
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                        {products &&
                            products.map((item, i) => (
                                <ProductCard key={i} {...item} />
                            ))}
                    </div>
                    {pagination?.totalPages > 1 && (
                        <div className="flex justify-center pt-12">
                            <Paginations
                                numberOfPages={pagination?.totalPages}
                                totalProducts={pagination?.totalElements}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Products;
