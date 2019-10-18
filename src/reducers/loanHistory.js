export const defaultState = [];

const loan = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'REQUEST_LOAN':
      return [...state, { ...payload }];
    case 'EXTEND_LAON':
      const extendableLoanId = state.findIndex((item) => item.id === payload.id);
      const newState = [...state];
      newState[extendableLoanId] = payload;
      return [...newState];
    case 'GET_LOAN_HISTORY':
      return [...payload];
    default:
      return state;
  }
};

export default loan;
