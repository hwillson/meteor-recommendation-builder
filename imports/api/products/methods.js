import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import throwNotAuthorizedException
  from '/imports/utility/exceptions/not_authorized.js';

let productSynch;
if (Meteor.isServer) {
  productSynch = require('./server/product_synch.js').default;
}

const synchProducts = new ValidatedMethod({
  name: 'products.synchProducts',
  validate: null,
  run() {
    if (this.userId && !this.isSimulation) {
      productSynch.run();
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

export { synchProducts };
