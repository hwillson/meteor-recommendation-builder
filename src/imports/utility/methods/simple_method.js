import { ValidatedMethod } from 'meteor/mdg:validated-method';

export default class SimpleMethod {
  constructor(spec) {
    this.spec = spec;
    this.method = new ValidatedMethod(spec);
  }

  call(args, callback) {
    return this.method.call(args, callback);
  }
}
