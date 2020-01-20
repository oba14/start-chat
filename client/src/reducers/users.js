const initialState = {
  users: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'DISCONNECT':
    case 'SERVER_DOWN':
    case 'INACTIVE':
      return {...state,
        users: [] 
      }
    case 'SET_USERS':
      return {
        ...state,
        users: payload
      }  
    default:
      return state;
  }
};
