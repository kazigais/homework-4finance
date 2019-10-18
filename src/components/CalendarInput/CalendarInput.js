import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import { Input, Label } from 'semantic-ui-react';
import moment from 'moment';
import './Override.scss';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import styles from './CalendarInput.module.scss';

class CalendarInput extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    onChange: () => {},
    value: new Date(),
  }

  constructor(props) {
    super(props);
    this.state = {
      maxDate: moment(props.value).add(30, 'days').toDate(),
      showDatePicker: false,
    };
  }

  toggleCalendar = () => {
    this.setState((prevState) => ({ showDatePicker: !prevState.showDatePicker }));
  }

  setStartDate = (date) => {
    this.setState({ showDatePicker: false });
    this.props.onChange(date);
  }

  render() {
    const { value } = this.props;
    return (
      <>
        <Input
          className={styles.input}
          onClick={() => this.toggleCalendar()}
          value={moment(value).format('LL')}
          labelPosition="left"
          type="text"
          placeholder="Loan length"
        >
          <Label basic><FaCalendarAlt /></Label>
          <input />
        </Input>
        <div className={styles['calendar-container']}>
          <Fade collapse top when={this.state.showDatePicker}>
            <DatePicker
              selected={value}
              maxDate={this.state.maxDate}
              minDate={value}
              onChange={(date) => this.setStartDate(date)}
              calendarClassName={styles.fluid}
              inline
            />
          </Fade>
        </div>
      </>
    );
  }
}

export default CalendarInput;
