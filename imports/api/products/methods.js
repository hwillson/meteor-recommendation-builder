import { Meteor } from 'meteor/meteor';
import SimpleMethod from '../../utility/methods/simple_method.js';
// import { ValidatedMethod } from 'meteor/mdg:validated-method';

import throwNotAuthorizedException
  from '../../utility/exceptions/not_authorized.js';

let productSynch;
if (Meteor.isServer) {
  productSynch = require('./server/product_synch.js').default;
}

export const synchProducts = new SimpleMethod({
  name: 'products.synchProducts',
  validate: null,
  run() {
    if (this.userId) {
      if (!this.isSimulation) {
        productSynch.run();
      }
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});
