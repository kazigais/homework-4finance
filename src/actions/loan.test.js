import configureMockStore from 'redux-mock-store';
import { ActionTypes, getLoanDetails, requestLoan } from './loan';
import { ActionTypes as AppActionTypes } from './app';
import thunk from 'redux-thunk';
import { defaultState as defaultLoanState } from '../reducers/loan';
import { defaultState as defaultLoanHistoryState } from '../reducers/loan';
import { defaultState as defaultAppState } from '../reducers/app';
import uuid from 'uuid/v1';
jest.mock('uuid/v1', () => () => 'testid');

const createStore = configureMockStore([thunk]);
let store;

describe('loan actions', () => {

  let dateNowSpy;

  beforeAll(() => {
      // Lock Time
      dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
  });

  beforeEach(() => {
    store = createStore({ app: defaultAppState, loan: defaultLoanState, loanHistory: defaultLoanHistoryState });
  });

  afterAll(() => {
      // Unlock Time
      dateNowSpy.mockRestore();
  });

  it('dispatches GET_LOAN_DETAILS', () => {
    const currentDate = new Date();
    const expectedActions = [
      { type: ActionTypes.GET_LOAN_DETAILS, 
        payload: {
          amount: 100,
          date: currentDate,
          apr: 10,
          repaymentAmount: "110.00",
        }
      },
      {
        type: AppActionTypes.TOGGLE_MESSAGE,
        payload: {
          state: false,
          message: undefined,
        }
      }
    ];
    store.dispatch(getLoanDetails(100, currentDate));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches TOGGLE_MESSAGE when "amount" is over 400', () => {
    const currentDate = new Date();
    const expectedActions = [
      {
        type: AppActionTypes.TOGGLE_MESSAGE,
        payload: {
          state: true,
          message: 'Loan must not be over $400',
        }
      }
    ];
    store.dispatch(getLoanDetails(440, currentDate));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches TOGGLE_MESSAGE when "amount" is invalid', () => {
    const currentDate = new Date();
    const expectedActions = [
      {
        type: AppActionTypes.TOGGLE_MESSAGE,
        payload: {
          state: true,
          message: 'Amount is not valid',
        }
      }
    ];
    store.dispatch(getLoanDetails("aaa", currentDate));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches TOGGLE_MESSAGE when "amount" is not given', () => {
    const currentDate = new Date();
    const expectedActions = [
      {
        type: AppActionTypes.TOGGLE_MESSAGE,
        payload: {
          state: true,
          message: 'Please specify loan amount',
        }
      }
    ];
    store.dispatch(getLoanDetails(undefined, currentDate));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches REQUEST_LOAN', () => {
    const now = new Date(Date.now());

    const expectedActions = [
      {
        type: ActionTypes.REQUEST_LOAN,
        payload: {
          id: 'testid',
          amount: 100,
          repayableAmount: 110,
          date: now,
          apr: 10,
          dateCreated: now,
          isExtended: false,
        }
      }
    ];
    store.dispatch(requestLoan(100, 110, now, 10));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches TOGGLE_MODAL when high risk detected from initial page load', () => {
    const now = new Date(Date.now());

    const expectedActions = [
      {
        type: AppActionTypes.TOGGLE_MODAL,
        payload: {
          modalState: true,
          modalTitle: 'Error',
          modalBody: 'We\'re sorry',
        }
      }
    ];
    store.dispatch(requestLoan(400, 440, now, 10));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches TOGGLE_MODAL when high risk detected from many requests', () => {
    store = createStore({ app: defaultAppState, loan: defaultLoanState, loanHistory: [
      {
        id: '1',
        "dateCreated": new Date(),
      },
      {
        id: '2',
        "dateCreated": new Date(),
      },
      {
        id: '3',
        "dateCreated": new Date(),
      }
    ] });

    const expectedActions = [
      {
        type: AppActionTypes.TOGGLE_MODAL,
        payload: {
          modalState: true,
          modalTitle: 'Error',
          modalBody: 'We\'re sorry',
        }
      }
    ];
    store.dispatch(requestLoan(300, 320, new Date(), 10));
    expect(store.getActions()).toEqual(expectedActions);
  });

  
});