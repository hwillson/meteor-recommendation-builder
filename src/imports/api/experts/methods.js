import { ValidatedMethod, SimpleSchema } from '../../utility/meteor/packages';

import experts from './collection';
import customerSessions from '../customer_sessions/collection';

export const assignRandomExpert = new ValidatedMethod({
  name: 'experts.getRandomExpert',
  validate: new SimpleSchema({
    sessionId: { type: String },
  }).validator(),
  run({ sessionId }) {
    if (!this.isSimulation) {
      const customerSession = customerSessions.findOne({ _id: sessionId });
      if (!customerSession.expertId) {
        const randomSeed = Math.random();
        let expert = experts.findOne({
          randomSeed: {
            $gte: randomSeed,
          },
        });
        if (!expert) {
          expert = experts.findOne({
            randomSeed: {
              $lte: randomSeed,
            },
          });
        }
        customerSessions.update({
          _id: sessionId,
        }, {
          $set: {
            expertId: expert._id,
          },
        });
      }
    }
  },
});
