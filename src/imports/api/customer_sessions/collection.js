import { Mongo } from '../../utility/meteor/packages';
import customerSessionSchema from './schema.js';

const customerSessions = new Mongo.Collection('customer_sessions');
customerSessions.attachSchema(customerSessionSchema);

customerSessions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default customerSessions;
