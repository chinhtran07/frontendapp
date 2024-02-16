const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken
            };
        case 'logout': 
            return {
                ...state,
                user: null,
                accessToken: null
            }
        default:
            return state;
    }
}

export default authReducer