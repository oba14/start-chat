

const initialState = {
  socket: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_SOCKET':
      return {
          ...state,
          socket: payload
      }
    case 'SERVER_DOWN':
      return null;
    default:
      return state;
  }
};
