import { SimpleSchema } from '../../utility/meteor/packages';

const expertSchema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  title: {
    type: String,
  },
  email: {
    type: String,
    optional: true,
  },
  phone: {
    type: String,
    optional: true,
  },
  imageUrl: {
    type: String,
  },
  chatLink: {
    type: String,
    optional: true,
  },
  welcomeMessage: {
    type: String,
  },
  overviewMessage: {
    type: String,
  },
  sidebarMessage: {
    type: String,
  },
  twitter: {
    type: String,
  },
  facebook: {
    type: String,
  },
  randomSeed: {
    type: Number,
    decimal: true,
  },
});

export default expertSchema;
