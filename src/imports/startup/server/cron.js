import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';

import productSynch from '/imports/api/products/server/product_synch.js';

SyncedCron.add({
  name: 'Synchronize all products',
  schedule(parser) {
    return parser.text('at 1:00 am');
  },
  job() {
    productSynch.run();
  },
});

if (Meteor.settings.private.cronEnabled) {
  SyncedCron.start();
}
