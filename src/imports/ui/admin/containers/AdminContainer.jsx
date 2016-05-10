import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer((props) => {
  const data = {
    user: Meteor.user(),
    children: props.children,
  };
  return data;
}, App);
