export default userReducer = (state, action) => {
    switch(action.type) {
        case 'read':
            return action.payload.user
        default:
            return state;
    }
}