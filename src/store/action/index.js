import api from "../../api/api";
import { toast } from "react-hot-toast";

export const fetchProducts = (queryString) => async (dispatch) => {
    try{
        dispatch({type : "IS_FETCHING"});
        const {data} = await api.get(`/public/products?${queryString}`);
        dispatch({
            type : "FETCH_PRODUCTS",
            payload : data.content,
            pageNumber : data.pageNumber,
            pageSize : data.pageSize,
            totalElements : data.totalElements,
            totalPages : data.totalPages,
            lastPage : data.lastPage,
        });
        dispatch({type : "IS_SUCCESS"});
    } catch (error){
        console.log(error);
        dispatch({
            type : "IS_ERROR",
            payload : error?.response?.data?.message || "Failed to fetch products",
        });
    }
};

export const fetchCategories = () => async (dispatch) => {
    try{
        dispatch({type : "CATEGORY_LOADER"});
        const {data} = await api.get(`/public/categories`);
        dispatch({
            type : "FETCH_CATEGORIES",
            payload : data.content,
            pageNumber : data.pageNumber,
            pageSize : data.pageSize,
            totalElements : data.totalElements,
            totalPages : data.totalPages,
            lastPage : data.lastPage,
        });
        dispatch({type : "IS_ERROR"});
    } catch (error){
        console.log(error);
        dispatch({
            type : "IS_ERROR",
            payload : error?.response?.data?.message || "Failed to fetch category",
        });
    }
};

export const addToCart = (data, qty = 1, toast) => 
    (dispatch, getState) => {
        // Find the product
        const {products} = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        // Chcek for stocks
        const isQuantityExist = getProduct.quantity >= qty;
        // If in stock -> add to cart
        if(isQuantityExist){
            dispatch({type : "ADD_TO_CART", payload : {...data, quantity : qty}});
            toast.success(`${data?.productName} added to cart.`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        }else{
            // error
            toast.error("Out of stock!");
        }
};

export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the product in the product list
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;
        if(isQuantityExist){
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            // Update cart in redux
            dispatch({
                type : "ADD_CART",
                payload : {...data, quantity : newQuantity + 1},
            })

            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        }else{
            toast.error("Quantity reached to Limit!");
        }
    };

export const decreaseCartQuantity = (data, newQuantity) =>
    (dispatch, getState) => {   
        dispatch({
            type : "ADD_CART",
            payload : {...data, quantity : newQuantity},
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSignInUser 
    = (sendData, toast, reset, navigate, setLoader) => async(dispatch) => {
        
};