# Product Recommendation Builder

## Overview

This [Meteor](https://meteor.com) based application presents potential customers with a list of questions to answer. Answers to these questions help steer product recommendations. Production recommendations are then presented for purchase. Administrators can manage how recommended products line up with customer answers.

## Technology

Meteor based application using [React](https://facebook.github.io/react/) for the view layer and Mongo for the database. This application leverages Meteor 1.3's out of the box [npm](http://guide.meteor.com/using-packages.html#npm) and [ES2015 module](http://guide.meteor.com/structure.html#es2015-modules) support.

## Installation/Running
```
git clone https://github.com/hwillson/meteor-recommendation-builder.git
npm install
npm start
```

## Modules

### Customer

- Customer facing recommendation builder: http://localhost:3000/build

### Admin

- Admin: http://localhost:3000/admin

## Testing

Run all tests with `npm test`.

