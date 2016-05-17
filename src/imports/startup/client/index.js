import { render } from 'react-dom';

import './register_api';
import { renderRoutes } from '/imports/startup/client/routes';

render(renderRoutes(), document.getElementById('app'));
