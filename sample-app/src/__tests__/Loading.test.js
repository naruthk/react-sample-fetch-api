import React from 'react';
import ReactDOM from 'react-dom';
import Loading from '../components/Loading/Loading';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe('<Loading /> Component', () => {

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loading />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});