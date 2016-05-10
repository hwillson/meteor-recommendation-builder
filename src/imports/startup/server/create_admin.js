import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const users = [
  {
    email: Meteor.settings.private.admin.email,
    password: Meteor.settings.private.admin.password,
  },
];

const foundEmails = [];
Meteor.users.find().forEach((doc) => {
  if (doc.emails) {
    foundEmails.push(doc.emails[0].address);
  }
});

users.forEach((user) => {
  if (foundEmails.indexOf(user.email) === -1) {
    Accounts.createUser({
      email: user.email,
      password: user.password,
    });
  }
});
