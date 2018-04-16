import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe('<App /> Component', () => {

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have proper initial states', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().loading).toEqual(true);
    expect(wrapper.state().users).toEqual({});
    expect(wrapper.state().sortedUsers).toEqual({});
  });

});