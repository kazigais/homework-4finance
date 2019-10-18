import reducer from './loan';

const defaultState = {};

describe('loan reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle GET_LOAN_DETAILS', () => {
    const payload = {
      amount: 1000,
      date: new Date(),
      apr: 10,
      repaymentAmount: 1100,
    }
    const startAction = {
      type: 'GET_LOAN_DETAILS',
      payload,
    };
    expect(reducer(undefined, startAction)).toEqual(payload);
  });
});