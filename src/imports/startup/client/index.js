/* global document */
import { render } from 'react-dom';

import { renderRoutes } from '/imports/startup/client/routes';
import './register_api';

render(renderRoutes(), document.getElementById('app'));
