import reducer from './app';

const defaultState = {
  state: false,
  loadTimestamp: new Date(1487076708000),
};

describe('app reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(defaultState, {})).toEqual(defaultState);
  });

  it('should handle TOGGLE_MESSAGE', () => {
    const startAction = {
      type: 'TOGGLE_MESSAGE',
      payload: {
        state: true,
        message: "placeholder"
      }
    };
    expect(reducer(undefined, startAction).state).toEqual(true);
    expect(reducer(undefined, startAction).message).toEqual("placeholder");
  });

  it('should handle TOGGLE_MODAL', () => {
    const startAction = {
      type: 'TOGGLE_MODAL',
      payload: {
        modalState: true,
        modalTitle: "title",
        modalBody: "body"
      }
    };
    expect(reducer(undefined, startAction).modalState).toEqual(true);
    expect(reducer(undefined, startAction).modalTitle).toEqual("title");
    expect(reducer(undefined, startAction).modalBody).toEqual("body");
  });
});