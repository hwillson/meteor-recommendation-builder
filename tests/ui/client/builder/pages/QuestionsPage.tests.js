/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findWithClass } from 'react-shallow-testutils';

import QuestionsPage from '../../../../../src/imports/ui/builder/pages/QuestionsPage.js';

describe('ui.builder.pages.QuestionsPage', function () {
  it('should show questions page', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<QuestionsPage />);
    const output = renderer.getRenderOutput();
    const page = findWithClass(output, 'questions-page');
    expect(page).to.not.be.empty;
  });
});
