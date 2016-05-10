/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import checklist from './checklist.js';

if (Meteor.isClient) {
  describe('ui.admin.helpers', () => {
    describe('checkbox', () => {
      describe('isChecked', () => {
        it('should return false if no checkbox values are provided', () => {
          chai.expect(checklist.isChecked()).to.equal(false);
        });

        it('should return false if checkbox check value is not in checkbox '
            + 'array', () => {
          chai.expect(checklist.isChecked(['A', 'B'], 'C')).to.equal(false);
        });

        it('should return true if checkbox check value is in checkbox '
            + 'array', () => {
          chai.expect(checklist.isChecked(['A', 'B'], 'A')).to.equal(true);
        });
      });

      describe('saveChanges', () => {
        it('should not call the passed in Method if checkbox values/value, '
            + 'product ID or field name is missing', () => {
          const data = {
            values: null,
            value: null,
            checked: null,
            productId: null,
            method: {
              call() {},
            },
            field: null,
          };
          const stub = sinon.stub(data.method, 'call');
          checklist.saveChanges(data);
          chai.expect(stub.callCount).to.equal(0);
          data.values = ['A'];
          checklist.saveChanges(data);
          chai.expect(stub.callCount).to.equal(0);
          data.value = 'B';
          checklist.saveChanges(data);
          chai.expect(stub.callCount).to.equal(0);
          data.productId = 'abc123';
          checklist.saveChanges(data);
          chai.expect(stub.callCount).to.equal(0);
        });

        it('should call Method with checkbox value added to Method checkbox '
            + 'values, if checked is true and value is not in values', () => {
          const data = {
            values: ['A'],
            value: 'B',
            checked: true,
            productId: 'abc123',
            method: {
              call() {},
            },
            field: 'field',
          };
          const stub = sinon.stub(data.method, 'call');
          checklist.saveChanges(data);
          chai.expect(stub.callCount).to.equal(1);
          chai.expect(stub.args[0][0].field).to.eql(['A', 'B']);
        });

        it('should call Method with checkbox value removed from Method '
            + 'checkbox values, if checked is false and value is in '
            + 'values', () => {
          const data = {
            values: ['A', 'B'],
            value: 'A',
            checked: false,
            productId: 'abc123',
            method: {
              call() {},
            },
            field: 'field',
          };
          const stub = sinon.stub(data.method, 'call');
          checklist.saveChanges(data);
          chai.expect(stub.callCount).to.equal(1);
          chai.expect(stub.args[0][0].field).to.eql(['B']);
        });
      });

      describe('generateElementId', () => {
        it('should return an empty string if productId and value are '
            + 'missing', () => {
          chai.expect(checklist.generateElementId()).to.equal('');
        });

        it('should return a productId_value string if productId and value are '
            + 'provided', () => {
          const productId = 'abc123';
          const value = 'test';
          chai.expect(checklist.generateElementId(productId, value))
            .to.equal(`${productId}_${value}`);
        });
      });
    });
  });
}
