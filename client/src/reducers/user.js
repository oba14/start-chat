const initialState = {
  user: {
    id: null,
    username: null}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case 'DISCONNECT':
      case 'SERVER_DOWN':
      case 'INACTIVE':
        return {
          ...state,
          user: {...state.user, 
          id: null,
          username: null,   
          }
      }
    case 'SET_USER':
    return {
      ...state,
      user: {...state.user, 
      id: payload.id,
      username: payload.username,   
      }
    }  
    default:
      return state;
  }
};
