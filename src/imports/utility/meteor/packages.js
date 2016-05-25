/* global meteorInstall */

const meteorRequire = meteorInstall();

export const Meteor = meteorRequire('meteor/meteor').Meteor;
export const HTTP = meteorRequire('meteor/http').HTTP;
export const Factory = meteorRequire('meteor/factory').Factory;
export const Mongo = meteorRequire('meteor/mongo').Mongo;
export const PublicationCollector =
  meteorRequire('meteor/publication-collector').PublicationCollector;
export const Random = meteorRequire('meteor/random').Random;
export const _ = meteorRequire('meteor/underscore')._;
export const createContainer = meteorRequire('meteor/react-meteor-data').createContainer;

let createFiber;
try {
  createFiber = require('fibers');
} catch (error) {
  createFiber = (someFunction) => {
    return {
      run() {
        someFunction();
      },
    };
  };
}
export { createFiber };

export const ValidatedMethod = meteorRequire('meteor/mdg:validated-method').ValidatedMethod;
export const SimpleSchema = meteorRequire('meteor/aldeed:simple-schema').SimpleSchema;
export const StubCollections = meteorRequire('meteor/hwillson:stub-collections').default;
