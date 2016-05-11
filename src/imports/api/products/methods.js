import { Meteor } from '../../utility/meteor/meteor.js';
import { ValidatedMethod } from '../../utility/meteor/mdg_validated_method.js';

import throwNotAuthorizedException
  from '../../utility/exceptions/not_authorized.js';

let ProductSynch;
if (Meteor.isServer) {
  try {
    ProductSynch = require('./server/product_synch.js').ProductSynch;
  } catch (error) {
    // Do nothing
  }
}

export const synchProducts = new ValidatedMethod({
  name: 'products.synchProducts',
  validate: null,
  run() {
    if (this.userId) {
      if (!this.isSimulation) {
        ProductSynch.run();
      }
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});
