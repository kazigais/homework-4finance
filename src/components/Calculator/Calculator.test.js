import React from 'react';
import Calculator from './Calculator';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('Calculator component', () => {

  let props;

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      title: '',
      errorMessage: '',
      date: new Date('Feb 28 2013 19:00:00 EST'),
    };
  })

  it('matches snapshot', () => {
    const wrapper = shallow(<Calculator {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('calls onSubmit when button is clicked', () => {
    const wrapper = shallow(<Calculator {...props} />);
    wrapper.find('[data-test="calculator-button"]').simulate('click');
    expect(props.onSubmit).toBeCalled();
  });
});
