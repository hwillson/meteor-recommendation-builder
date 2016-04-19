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

**Note:** Until the published npm dependencies `griddle-react` and `react-shallow-testutils` are updated to use React 15, I'm linking to the GitHub development versions directly. This means that after running `npm install` for the project, some additional work is needed for the dependencies:

```
cd [APP_ROOT]/node_modules/griddle-react
npm install
grunt
cd [APP_ROOT]/node_modules/react-shallow-testutils
npm install
```

## Testing

Run all tests with `npm test`.

## Modules

### Customer

#### Access

- Customer facing recommendation builder: http://localhost:3000/build

### Admin

#### Access

- Admin: http://localhost:3000/admin

#### Product Synch

- Admins can only add products to the recommendation engine that are available within the system.
- Products are pulled in from an external web service on a regular basis, and stored within Mongo.
- Product synch scheduling is controlled by [percolate:synced-cron](https://atmospherejs.com/percolate/synced-cron).
- Product synch is currently set to run every 24 hours
- When logged in as an admin a manual product synch can be run by calling the following method via a browser console: `require('./imports/api/products/methods.js').synchProducts.call()`
- Source product web service URL is configured in the `settings.json` file, and must be reachable via get (currently no authentication supported). Web service response must look like:

```
{
  "success": true or false,
  "data": "[
    { 
      \"productId\": 123,
      \"productName\": \"Some Product\",
      \"productUrl\": \"http://blah.com/some-product\",
      \"productImage\": \"http://blah.com/some-image\",
      \"variationId\": 456,
      \"variationName\": \"Some Variation\",
      \"status\": \"active\" or \"inactive\"     
    }, 
    ...
  ]"
} 
```




