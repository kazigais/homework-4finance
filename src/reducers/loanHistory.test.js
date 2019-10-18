import reducer from './loanHistory';

const defaultState = [];

describe('loanHistory reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle REQUEST_LOAN', () => {
    const payload = {
      id: '123',
      amount: 100,
      repayableAmount: 110,
      date: new Date(),
      apr: 10,
      dateCreated: new Date(),
      isExtended: false,
    }
    const startAction = {
      type: 'REQUEST_LOAN',
      payload,
    };
    expect(reducer(undefined, startAction)).toEqual([payload]);
  });

  it('should handle EXTEND_LAON', () => {

    const prevState = [{
      id: '123',
      amount: 100,
      repayableAmount: 110,
      date: new Date(),
      apr: 10,
      dateCreated: new Date(),
      isExtended: false,
    }];

    const payload = {
      ...prevState[0],
      repayableAmount: 120,
    }
    const startAction = {
      type: 'EXTEND_LAON',
      payload,
    };
    expect(reducer(prevState, startAction)[0].repayableAmount).toEqual(120);
  });
});