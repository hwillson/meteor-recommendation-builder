import { ValidatedMethod } from '../../utility/meteor/packages.js';

import throwNotAuthorizedException
  from '../../utility/exceptions/not_authorized.js';

const synchProducts = new ValidatedMethod({
  name: 'products.synchProducts',
  validate: null,
  run() {
    if (this.userId) {
      if (!this.isSimulation) {
        import { ProductSynch } from './server/product_synch';
        ProductSynch.run();
      }
    } else {
      throwNotAuthorizedException(this.name);
    }
  },
});

export default synchProducts;
