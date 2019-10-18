export const ActionTypes = {
  TOGGLE_MESSAGE: 'TOGGLE_MESSAGE',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
};

export const toggleMessage = (state, message) => ({
  type: ActionTypes.TOGGLE_MESSAGE,
  payload: {
    message,
    state,
  },
});

export const toggleModal = (modalState, modalTitle, modalBody) => ({
  type: ActionTypes.TOGGLE_MODAL,
  payload: {
    modalState,
    modalTitle,
    modalBody,
  },
});
