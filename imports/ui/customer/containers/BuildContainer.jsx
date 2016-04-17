import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const options = {
    loading: false,
  };
  return options;
}, App);
