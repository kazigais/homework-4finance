export const defaultState = {};

const loan = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'GET_LOAN_DETAILS':
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default loan;
