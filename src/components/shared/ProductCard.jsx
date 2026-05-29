import { useState } from "react";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/action";
import toast from "react-hot-toast";

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    about
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    };

    const productData = {
        id: productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
    };

    return (
        <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Image Container */}
            <div
                onClick={() => handleProductView(productData)}
                className="relative w-full overflow-hidden aspect-3/2 bg-slate-50 cursor-pointer"
            >
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={image}
                    alt={productName}
                />
                {/* Discount Badge */}
                {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                        -{discount}%
                    </span>
                )}
                {/* Quick View Overlay */}
                {!about && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white rounded-full p-3 shadow-lg">
                                <FaEye className="text-slate-700 text-lg" />
                            </div>
                        </div>
                    </div>
                )}
                {/* Stock Badge */}
                {!about && !isAvailable && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-full text-sm">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h2
                    onClick={() => handleProductView(productData)}
                    className="text-base font-semibold text-slate-800 dark:text-slate-100 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-tight"
                >
                    {truncateText(productName, 50)}
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 min-h-[40px] leading-relaxed">
                    {truncateText(description, 70)}
                </p>

                {!about && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        {specialPrice ? (
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-slate-800 dark:text-white">
                                    ${Number(specialPrice).toFixed(2)}
                                </span>
                                <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                                    ${Number(price).toFixed(2)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-xl font-bold text-slate-800 dark:text-white">
                                ${Number(price).toFixed(2)}
                            </span>
                        )}

                        <button
                            disabled={!isAvailable || btnLoader}
                            onClick={() =>
                                addToCartHandler({
                                    image,
                                    productName,
                                    description,
                                    specialPrice,
                                    price,
                                    productId,
                                    quantity,
                                })
                            }
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isAvailable
                                    ? "bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-700 dark:hover:bg-indigo-700 active:scale-95 cursor-pointer"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                            }`}
                        >
                            <FaShoppingCart className="text-xs" />
                            {isAvailable ? "Add" : "Sold Out"}
                        </button>
                    </div>
                )}
            </div>

            <ProductViewModal
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    );
};

export default ProductCard;
