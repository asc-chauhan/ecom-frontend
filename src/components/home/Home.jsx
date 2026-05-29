import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/action";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="lg:px-14 sm:px-8 px-4 pb-16">
            {/* Hero Banner */}
            <div className="py-6">
                <HeroBanner />
            </div>

            {/* Featured Products Section */}
            <div className="py-12">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                            Curated for you
                        </span>
                        <h1 className="text-slate-800 dark:text-white text-3xl sm:text-4xl font-bold mt-2">
                            Featured Products
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                            Discover our handpicked selection of top-rated items just for you.
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="hidden sm:flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition group"
                    >
                        View All
                        <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

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
                    <>
                        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                            {products &&
                                products
                                    .slice(0, 8)
                                    .map((item, i) => <ProductCard key={i} {...item} />)}
                        </div>
                        <div className="flex justify-center mt-10 sm:hidden">
                            <Link
                                to="/products"
                                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-700 transition"
                            >
                                View All Products
                                <FaArrowRight className="text-sm" />
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* Features Section */}
            <div className="grid sm:grid-cols-3 gap-6 py-12 border-t border-slate-200 dark:border-slate-800">
                {[
                    { title: "Free Shipping", desc: "On orders over $50", emoji: "🚚" },
                    { title: "Secure Payment", desc: "100% secure checkout", emoji: "🔒" },
                    { title: "24/7 Support", desc: "Dedicated support team", emoji: "💬" },
                ].map((feature) => (
                    <div key={feature.title} className="flex items-center gap-4 p-4">
                        <span className="text-3xl">{feature.emoji}</span>
                        <div>
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100">{feature.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
