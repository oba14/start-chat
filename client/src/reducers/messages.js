const initialState = {
  messages: [] 
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'NEW_MESSAGE':
    case 'SEND_MESSAGE':
    case 'USER_LEFT':
    case 'INACTIVE_USER':
    case 'NEW_USER_JOINED':
      return {
        ...state,
        messages: [...state.messages, payload]
      }
    case 'DISCONNECT':
    case 'SERVER_DOWN':
    case 'INACTIVE':
      return {...state,
        messages: []  
      };
    default:
      return state;
  }
};
