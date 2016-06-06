// import { Meteor, _ } from '../../utility/meteor/packages';
//
// const Cart = {
//   products: {},
//   totalItems: 0,
//   totalPrice: 0,
//
//   setProducts(products) {
//     if (!_.isEmpty(products) && _.isArray(products)) {
//       const variationName = Meteor.settings.public.products.variationName;
//       const variationKey = Meteor.settings.public.products.variationKey;
//       this.totalItems = 0;
//       this.totalPrice = 0;
//       products.forEach((product) => {
//         const variation = product[variationName];
//         const defaultVariationId = variation[0][variationKey];
//         this.addProduct(product._id, defaultVariationId, product.price, 1);
//       });
//     }
//   },
//
//   addProduct(productId, variationId, price, quantity = 1) {
//     if (productId && variationId && price) {
//       if (this.products[variationId]) {
//         this.products[variationId].quantity += quantity;
//       } else {
//         this.products[variationId] = {
//           productId,
//           quantity,
//           singlePrice: price,
//           enabled: true,
//         };
//       }
//       this.totalItems += quantity;
//       this.totalPrice += (quantity * price);
//     }
//   },
//
//   disableProduct(variationId) {
//     if (variationId) {
//       const variation = this.products[variationId];
//       variation.enabled = false;
//       this.totalItems -= variation.quantity;
//       this.totalPrice -= (variation.quantity * variation.singlePrice);
//     }
//   },
//
//   enableProduct(variationId) {
//     if (variationId) {
//       const variation = this.products[variationId];
//       variation.enabled = true;
//       this.totalItems += variation.quantity;
//       this.totalPrice += (variation.quantity * variation.singlePrice);
//     }
//   },
// };
//
// export default Cart;
