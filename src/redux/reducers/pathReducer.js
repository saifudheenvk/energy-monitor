const pathReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PATH_NAME':
      return action.payload;
    default:
      return state;
  }
};
export default pathReducer;
