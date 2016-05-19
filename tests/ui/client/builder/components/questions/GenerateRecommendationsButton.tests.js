/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { findWithType } from 'react-shallow-testutils';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import GenerateRecommendationsButton from
  '../../../../../../src/imports/ui/builder/components/questions/GenerateRecommendationsButton';
import { shallowRenderComponent } from '../../../../../../src/imports/utility/testing/helpers';

describe('ui.builder.components.questions.GenerateRecommendationsButton', function () {
  it('should be disabled when no questions', function () {
    const link = shallowRenderComponent(
      <GenerateRecommendationsButton
        questions={[]} customerSession={{}}
      />
    );
    expect(findWithType(link, Button).props.disabled).to.be.true;
  });

  it('should be disabled when no answers', function () {
    const questions = [{
      _id: 'q1',
    }];
    const customerSession = {
      answers: {},
    };
    const link = shallowRenderComponent(
      <GenerateRecommendationsButton
        questions={questions} customerSession={customerSession}
      />
    );
    expect(findWithType(link, Button).props.disabled).to.be.true;
  });

  it(
    'should be disabled when there are not answers to all mandatory questions',
    function () {
      const questions = [
        {
          _id: 'q1',
          mandatory: true,
        },
        {
          _id: 'q2',
          mandatory: false,
        },
      ];
      const customerSession = {
        answers: {
          q2: [1],
        },
      };
      const link = shallowRenderComponent(
        <GenerateRecommendationsButton
          questions={questions} customerSession={customerSession}
        />
      );
      expect(findWithType(link, Button).props.disabled).to.be.true;
    }
  );

  it(
    'should be enabled when answers exist to all mandatory questions',
    function () {
      const questions = [
        {
          _id: 'q1',
          mandatory: true,
        },
        {
          _id: 'q2',
          mandatory: false,
        },
      ];
      const customerSession = {
        answers: {
          q1: [1],
        },
      };
      const link = shallowRenderComponent(
        <GenerateRecommendationsButton
          questions={questions} customerSession={customerSession}
        />
      );
      expect(findWithType(link, Button).props.disabled).to.be.false;
    }
  );

  it(
    'should point generate recommendations button to products page if '
    + 'answers exist for all mandatory questions',
    function () {
      const questions = [
        {
          _id: 'q1',
          mandatory: true,
        },
        {
          _id: 'q2',
          mandatory: false,
        },
      ];
      const customerSession = {
        answers: {
          q1: [1],
        },
      };
      const button = shallowRenderComponent(
        <GenerateRecommendationsButton
          questions={questions} customerSession={customerSession}
        />
      );
      const linkContainer = findWithType(button, LinkContainer);
      expect(linkContainer).to.not.be.empty;
      expect(linkContainer.props.to.pathname).to.equal(
        '/builder/products'
      );
    }
  );
});
