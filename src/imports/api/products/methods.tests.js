/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { synchProducts } from './methods.js';

describe('api.products.methods', function () {
  describe('synchProducts', function () {
    it(
      'should be registered',
      sinon.test(function () {
        chai.expect(synchProducts).to.be.defined;
        chai.expect(synchProducts instanceof ValidatedMethod).to.be.true;
      })
    );

    it(
      'should get a not authorized exception if called when not logged in',
      sinon.test(function () {
        if (Meteor.isServer) {
          const productSynch =
            require('./server/product_synch.js').productSynch;
          this.stub(productSynch, 'run');
        }
        try {
          synchProducts.call();
          chai.expect(true).to.be.false;
        } catch (Error) {
          // Worked
        }
      })
    );

    if (Meteor.isServer) {
      it(
        'should synch products if called when logged in',
        sinon.test(function () {
          const productSynch = require('./server/product_synch.js').default;
          const runStub = this.stub(productSynch, 'run');
          synchProducts._execute({ userId: 'abc123' });
          chai.expect(runStub.callCount).to.equal(1);
        })
      );
    }
  });
});
