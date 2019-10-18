import React from 'react';
import LoanHistory from './LoanHistory';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('LoanHistory component', () => {

  let props;

  beforeEach(() => {
    props = {
      loanHistory: [{
        id: '123',
        repayableAmount: 100,
        amount: 80,
        isExtended: false,
        date: new Date('Feb 28 2013 19:00:00 EST'),
        dateCreated: new Date('Feb 28 2013 19:00:00 EST'),
      }],
    };
  })

  it('matches snapshot', () => {
    const wrapper = shallow(<LoanHistory {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
