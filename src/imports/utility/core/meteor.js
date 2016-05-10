import * as core from 'meteor/meteor';

let Meteor;
if (!core.Meteor.isTest) {
  Meteor = core.Meteor;
} else {
  const meteorStubs = require('meteor/velocity:meteor-stubs').MeteorStubs;
  const stubContext = {};
  meteorStubs.install(stubContext);
  Meteor = stubContext.Meteor;
}

export default Meteor;
