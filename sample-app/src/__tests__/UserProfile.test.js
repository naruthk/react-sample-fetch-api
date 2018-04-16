import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });

describe('<UserProfile /> Component', () => {

  const props = {
    "id": 20,
    "name": "daniel",
    "age": 49,
    "number": "555-555-5555",
    "photo": "https://d3iw72m71ie81c.cloudfront.net/male-85.jpg",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex sapien, interdum sit amet tempor sit amet, pretium id neque. Nam ultricies ac felis ut lobortis. Praesent ac purus vitae est dignissim sollicitudin. Duis iaculis tristique euismod. Nulla tellus libero, gravida sit amet nisi vitae, ultrices venenatis turpis. Morbi ut dui nunc."
  }

  const failProps = {
    "id": 20,
    "name": "daniel",
    "age": 49,
    "number": "",
    "photo": "https://d3iw72m71ie81c.cloudfront.net/male-85.jpg",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex sapien, interdum sit amet tempor sit amet, pretium id neque. Nam ultricies ac felis ut lobortis. Praesent ac purus vitae est dignissim sollicitudin. Duis iaculis tristique euismod. Nulla tellus libero, gravida sit amet nisi vitae, ultrices venenatis turpis. Morbi ut dui nunc."
  }

  it('should render without crashing when prop is passed', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserProfile user={props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should contain the user image', () => {
    const wrapper = shallow(<UserProfile user={props} />);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('should contain the user biography', () => {
    const wrapper = shallow(<UserProfile user={props} />);
    expect(wrapper.find('p.biography')).toHaveLength(1);
  });

});