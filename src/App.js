import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Header, Button, Segment, Grid, Divider, Modal,
} from 'semantic-ui-react';
import moment from 'moment';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import styles from './App.module.scss';
import {
  getLoanDetails, requestLoan, extendLoan, getLoanHistory,
} from './actions/loan';
import { toggleModal } from './actions/app';
import Calculator from './components/Calculator/Calculator';
import LoanHistory from './components/LoanHistory/LoanHistory';

export class App extends PureComponent {
  static propTypes = {
    app: PropTypes.shape({
      state: PropTypes.bool,
      message: PropTypes.string,
      modalState: PropTypes.bool,
      modalTitle: PropTypes.string,
      modalBody: PropTypes.string,
    }),
    loan: PropTypes.shape({
      repaymentAmount: PropTypes.number,
      amount: PropTypes.number,
      date: PropTypes.instanceOf(Date),
      apr: PropTypes.number,
    }),
    loanHistory: PropTypes.arrayOf(PropTypes.shape({

    })),
    getLoanDetails: PropTypes.func,
    requestLoan: PropTypes.func,
    extendLoan: PropTypes.func,
    toggleModal: PropTypes.func,
    getLoanHistory: PropTypes.func,
  }

  static defaultProps = {
    app: {},
    loan: {},
    loanHistory: [],
    getLoanDetails: () => {},
    requestLoan: () => {},
    extendLoan: () => {},
    toggleModal: () => {},
    getLoanHistory: () => {},
  }

  componentDidMount() {
    this.props.getLoanHistory();
  }

  render() {
    const { loan, app, loanHistory } = this.props;

    return (
      <div className={styles.container}>
        <Header size="huge">Micro-loan application</Header>
        <Segment className={styles['app-segment']} placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical />

            <Grid.Row verticalAlign="middle">
              <Grid.Column className={styles['segment-column']}>
                <Calculator
                  date={new Date(Date.now())}
                  title="Fixed term loan"
                  onSubmit={(amount, date) => this.props.getLoanDetails(amount, date, 10)}
                  errorMessage={app.state ? app.message : undefined}
                />
              </Grid.Column>

              <Grid.Column className={`${styles['segment-column']} ${styles.summary}`}>
                <Fade delay={500} collapse top when={loan.repaymentAmount !== undefined}>
                  <>
                    <Header className={styles['summary-title']} as="h2">
Total amount repayable: $
                      {loan.repaymentAmount}
                    </Header>
                    <Header className={styles['summary-title']} as="h2">
Loan cost: $
                      {(loan.repaymentAmount - loan.amount).toFixed(2)}
                    </Header>
                    <Header className={styles['summary-title']} as="h2">
Repayment date:
                      {loan.repaymentAmount !== undefined ? moment(loan.date).format('LL') : null}
                    </Header>
                    <Button
                      onClick={
                        () => this.props.requestLoan(loan.amount, loan.repaymentAmount, loan.date, loan.apr)
                      }
                      primary
                    >
                      Request loan
                    </Button>
                  </>
                </Fade>
                <Fade collapse top when={loan.repaymentAmount === undefined}>
                  <Header className={styles['summary-title']} as="h2">Fill out your required loan details in the calculator</Header>
                </Fade>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <LoanHistory
          loanHistory={loanHistory}
          onLoanExtend={(id) => this.props.extendLoan(id)}
        />
        <Modal
          open={app.modalState}
          header={app.modalTitle}
          content={app.modalBody}
          onClose={() => this.props.toggleModal(false, null, null)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loan: state.loan,
  app: state.app,
  loanHistory: state.loanHistory,

});

const mapDispatchToProps = {
  getLoanDetails,
  requestLoan,
  extendLoan,
  toggleModal,
  getLoanHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
