import { render } from 'react-dom';

import './register_api.js';
import { renderRoutes } from '/imports/startup/client/routes.jsx';

render(renderRoutes(), document.getElementById('app'));
