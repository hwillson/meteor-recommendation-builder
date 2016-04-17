/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
// import React from 'react';
// import ReactTestUtils from 'react-addons-test-utils';
import { chai } from 'meteor/practicalmeteor:chai';

import ListCheckbox from './ListCheckbox.jsx';

if (Meteor.isClient) {
  describe('ui.admin.components', () => {
    describe('ListCheckbox', () => {
      it('should display a checkbox input and label', () => {
        const data = {
          productId: 'abc123',
          value: 'test value',
          label: 'test label',
          checked: false,
          onChange: () => {},
        };
        const listCheckbox = new ListCheckbox(data);
        chai.expect(listCheckbox.props.className).to.contain('list-checkbox');
        const children = listCheckbox.props.children;
        chai.expect(children[0].props.type).to.equal('checkbox');
        chai.expect(children[1].type).to.equal('label');
      });

      it('should set a checkbox id by combining the product ID with the '
          + 'checkbox value', () => {
        const data = {
          productId: 'abc123',
          value: 'test value',
          label: 'test label',
          checked: false,
          onChange: () => {},
        };
        const listCheckbox = new ListCheckbox(data);
        const children = listCheckbox.props.children;
        chai.expect(children[0].props.id).to.equal(
          `${data.productId}_${data.value}`
        );
      });
    });
  });
}
