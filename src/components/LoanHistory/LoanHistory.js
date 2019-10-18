import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';
import moment from 'moment';

class LoanHistory extends PureComponent {
  static propTypes = {
    onLoanExtend: PropTypes.func,
    loanHistory: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      repayableAmount: PropTypes.number,
      amount: PropTypes.number,
      isExtended: PropTypes.bool,
      date: PropTypes.instanceOf(Date),
      dateCreated: PropTypes.instanceOf(Date),
    })),
  }

  static defaultProps = {
    onLoanExtend: () => {},
    loanHistory: [],
  }

  render() {
    const { loanHistory, onLoanExtend } = this.props;

    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="6">Loan History</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Repayable Amount</Table.HeaderCell>
            <Table.HeaderCell>Extended</Table.HeaderCell>
            <Table.HeaderCell>Payment date</Table.HeaderCell>
            <Table.HeaderCell>Date issued</Table.HeaderCell>
            <Table.HeaderCell>Options</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loanHistory.map((pastLoan) => (
            <Table.Row key={pastLoan.id}>
              <Table.Cell>{pastLoan.amount}</Table.Cell>
              <Table.Cell>{pastLoan.repayableAmount}</Table.Cell>
              <Table.Cell>{pastLoan.isExtended ? 'Yes' : 'No'}</Table.Cell>
              <Table.Cell>{moment(pastLoan.date).format('LL')}</Table.Cell>
              <Table.Cell>{moment(pastLoan.dateCreated).format('LL')}</Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => (!pastLoan.isExtended ? onLoanExtend(pastLoan.id) : null)}
                  disabled={pastLoan.isExtended}
                  content="Extend"
                  primary
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default LoanHistory;
