import configureMockStore from 'redux-mock-store';
import { ActionTypes, toggleMessage, toggleModal } from './app';
import { defaultState } from '../reducers/app';

const createStore = configureMockStore([]);
let store;

describe('app actions', () => {
  beforeEach(() => {
    store = createStore(defaultState);
  });

  it('dispatches TOGGLE_MESSAGE', () => {
    const expectedActions = [
      { type: ActionTypes.TOGGLE_MESSAGE, payload: {
        state: true,
        message: 'message',
      }},
    ];
    store.dispatch(toggleMessage(true, 'message'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches TOGGLE_MODAL', () => {
    const expectedActions = [
      { type: ActionTypes.TOGGLE_MODAL, payload: {
        modalState: true,
        modalTitle: 'title',
        modalBody: 'body',
      }},
    ];
    store.dispatch(toggleModal(true, 'title', 'body'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});