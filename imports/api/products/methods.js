import { ValidatedMethod } from 'meteor/mdg:validated-method';

import throwNotAuthorizedException
  from '/imports/utility/exceptions/not_authorized.js';

const synchProducts = new ValidatedMethod({
  name: 'products.synchProducts',
  validate: null,
  run() {
    if (this.userId && !this.isSimulation) {
      const productSynch = require('./server/product_synch.js').default;
      productSynch.run();
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

export { synchProducts };
