const initialState = {
    productCount: 0,
    totalOrders: 0,
    totalRevenue: 0,
    loading: false,
    error: null,
};

export const analyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ANALYTICS_LOADING":
            return { ...state, loading: true, error: null };
        case "FETCH_ANALYTICS":
            return {
                ...state,
                loading: false,
                productCount: action.payload.productCount,
                totalOrders: action.payload.totalOrders,
                totalRevenue: action.payload.totalRevenue,
            };
        case "ANALYTICS_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
