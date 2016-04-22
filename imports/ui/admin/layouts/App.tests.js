/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findWithType, findWithClass } from 'react-shallow-testutils';

import App from './App.jsx';
import Login from '../components/auth/Login.jsx';

if (Meteor.isClient) {
  describe('ui.layouts.App', function () {
    it('should show login if not logged in', function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(<App user={null} />);
      const output = renderer.getRenderOutput();
      const login = findWithType(output, Login);
      chai.expect(login).to.not.be.empty;
    });

    it('should show dashboard if logged in', function () {
      const renderer = TestUtils.createRenderer();
      renderer.render(<App user={{ email: 'test@test.com' }} />);
      const output = renderer.getRenderOutput();
      const dashboard = findWithClass(output, 'admin');
      chai.expect(dashboard).to.not.be.empty;
    });
  });
}
