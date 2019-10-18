import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('App component', () => {

  const props = {
    app: {},
    loanHistory: [],
    loan: {},
    getLoanHistory: () => {},
  }

  let dateNowSpy;

  beforeAll(() => {
      // Lock Time
      dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
  });

  afterAll(() => {
      // Unlock Time
      dateNowSpy.mockRestore();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<App {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
