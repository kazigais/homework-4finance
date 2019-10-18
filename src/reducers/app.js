export const defaultState = {
  state: false,
  loadTimestamp: new Date(),
};

const app = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'TOGGLE_MESSAGE':
      return { ...state, ...payload };
    case 'TOGGLE_MODAL':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default app;
