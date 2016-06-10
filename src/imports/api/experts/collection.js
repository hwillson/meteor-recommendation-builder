import { Mongo } from '../../utility/meteor/packages';

import expertSchema from './schema';

const experts = new Mongo.Collection('experts');
experts.attachSchema(expertSchema);

export default experts;
