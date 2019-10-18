import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Header, Button, Input, Label, Segment, Message,
} from 'semantic-ui-react';
import { FaDollarSign } from 'react-icons/fa';
import styles from './Calculator.module.scss';
import CalendarInput from '../CalendarInput/CalendarInput';

class Calculator extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    errorMessage: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    amount: PropTypes.number,
  }

  static defaultProps = {
    onSubmit: () => {},
    title: '',
    errorMessage: undefined,
    date: new Date(),
    amount: undefined,
  }

  constructor(props) {
    super(props);
    const { amount, date } = props;
    this.state = {
      amount,
      date,
    };
  }

  setDate = (date) => {
    this.setState({ date });
  }

  setAmount = (amount) => {
    this.setState({ amount });
  }

  render() {
    const { onSubmit, title, errorMessage } = this.props;

    return (
      <Segment className={styles['form-segment']} raised>
        <Header as="h1">{title}</Header>
        {errorMessage && (
          <Message negative>
            <Message.Header>{errorMessage}</Message.Header>
          </Message>
        )}
        <Input
          className={styles.input}
          onChange={(e) => this.setAmount(e.target.value)}
          labelPosition="right"
          type="text"
          placeholder="Amount"
        >
          <Label basic><FaDollarSign /></Label>
          <input />
          <Label>.00</Label>
        </Input>
        <CalendarInput
          value={this.state.date}
          onChange={(value) => this.setDate(value)}
        />
        <Button
          data-test="calculator-button"
          onClick={() => onSubmit(this.state.amount, this.state.date)}
          className={styles.calculate}
          fluid
          basic
          color="green"
        >
          Calculate
        </Button>
      </Segment>
    );
  }
}

export default Calculator;
