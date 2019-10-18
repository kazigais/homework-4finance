import uuidv1 from 'uuid/v1';
import moment from 'moment';
import { toggleMessage, toggleModal } from './app';

export const ActionTypes = {
  GET_LOAN_DETAILS: 'GET_LOAN_DETAILS',
  REQUEST_LOAN: 'REQUEST_LOAN',
  EXTEND_LAON: 'EXTEND_LAON',
  GET_LOAN_HISTORY: 'GET_LOAN_HISTORY',
};

const saveLoan = (loan) => {
  let loanHistory = localStorage.getItem('loanHistory');
  if (loanHistory === null) {
    loanHistory = [];
  } else {
    loanHistory = JSON.parse(loanHistory);
  }
  loanHistory.push(loan);
  localStorage.setItem('loanHistory', JSON.stringify(loanHistory));
};

const updateLoans = (loans) => {
  localStorage.setItem('loanHistory', JSON.stringify(loans));
};

export const getLoanHistory = () => {
  let loanHistory = localStorage.getItem('loanHistory');
  if (loanHistory === null) {
    loanHistory = [];
  } else {
    loanHistory = JSON.parse(loanHistory);
  }
  return {
    type: ActionTypes.GET_LOAN_HISTORY,
    payload: loanHistory,
  };
};


export const getLoanDetails = (amount, date, apr = 10) => (dispatch) => {
  if (!amount) {
    return dispatch(toggleMessage(true, 'Please specify loan amount'));
    // eslint-disable-next-line no-restricted-globals
  } if (isNaN(amount)) {
    return dispatch(toggleMessage(true, 'Amount is not valid'));
  } if (amount > 400) {
    return dispatch(toggleMessage(true, 'Loan must not be over $400'));
  } if (!date) {
    return dispatch(toggleMessage(true, 'Please select duration of loan'));
  }

  const parsedAmount = parseInt(amount, 10);
  const repaymentAmount = (parsedAmount * (apr / 100) + parsedAmount).toFixed(2);

  dispatch({
    type: ActionTypes.GET_LOAN_DETAILS,
    payload: {
      amount: parsedAmount,
      date,
      apr,
      repaymentAmount,
    },
  });
  return dispatch(toggleMessage(false));
};

export const requestLoan = (amount, repayableAmount, date, apr) => (dispatch, getState) => {
  const { loadTimestamp } = getState().app;
  const { loanHistory } = getState();
  const duration = moment.duration(moment().diff(moment(loadTimestamp))).asSeconds();
  if (duration < 30 && amount >= 400) {
    // High risk
    return dispatch(toggleModal(true, 'Error', 'We\'re sorry'));
  }

  if (loanHistory.length >= 3) {
    loanHistory.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    const loanDuration = moment.duration(moment(new Date()).diff(moment(loanHistory[2].dateCreated))).asSeconds();
    if (loanDuration <= 60) {
      // High risk
      return dispatch(toggleModal(true, 'Error', 'We\'re sorry'));
    }
  }

  const newLoan = {
    id: uuidv1(),
    amount,
    repayableAmount,
    date,
    apr,
    dateCreated: new Date(Date.now()),
    isExtended: false,
  };

  saveLoan(newLoan);

  return dispatch({
    type: ActionTypes.REQUEST_LOAN,
    payload: newLoan,
  });
};

export const extendLoan = (id) => (dispatch, getState) => {
  const loans = getState().loanHistory;
  const extendableLoanId = loans.findIndex((loan) => loan.id === id);
  const extendableLoan = loans[extendableLoanId];
  // Update new conditions
  extendableLoan.isExtended = true;
  extendableLoan.date = moment(extendableLoan.date).add(7, 'days').toDate();
  const loanAmount = parseFloat(extendableLoan.amount);
  extendableLoan.repayableAmount = (loanAmount * (11.5 / 100) + loanAmount).toFixed(2);

  loans[extendableLoanId] = extendableLoan;
  updateLoans(loans);

  dispatch({
    type: ActionTypes.EXTEND_LAON,
    payload: {
      ...extendableLoan,
    },
  });
};
