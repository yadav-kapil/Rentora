export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": 
            return { ...state, user: action.payload, isLoggedin: true, isLoading: false }
        case "LOGOUT":
            return { ...state, user: null, isLoggedin: false, isLoading: false }
        case "SET_LOADING":
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}