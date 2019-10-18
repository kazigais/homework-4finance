import React from 'react';
import CalendarInput from './CalendarInput';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('CalendarInput component', () => {

  let props;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      value: new Date('Feb 28 2013 19:00:00 EST'),
    };
  })

  it('matches snapshot', () => {
    const wrapper = shallow(<CalendarInput {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('closes when setStartDate is called', () => {
    const wrapper = shallow(<CalendarInput {...props} />);
    wrapper.state().showDatePicker = true;
    wrapper.instance().setStartDate(props.value);
    expect(wrapper.state().showDatePicker).toBe(false);
  });

  it('calls handler when setStartDate is called', () => {
    const wrapper = shallow(<CalendarInput {...props} />);
    wrapper.instance().setStartDate(props.value);
    expect(props.onChange).toHaveBeenCalled();
  });

  it('toggles modal state when toggleCalendar is called', () => {
    const wrapper = shallow(<CalendarInput {...props} />);
    wrapper.instance().toggleCalendar();
    expect(wrapper.state().showDatePicker).toBe(true);
  });
});
