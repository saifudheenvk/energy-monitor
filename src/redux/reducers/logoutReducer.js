

const logoutReducer = (state ={},action)=>{
    switch (action.type) {
        case 'LOGOUT_SUCCESS':
            return action.payload;
        default:
            return "";
    }
}
export default logoutReducer;