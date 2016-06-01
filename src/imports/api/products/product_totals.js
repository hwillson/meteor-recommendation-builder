const ProductTotals = {
  totalItems: 0,
  totalPrice: 0,

  init(products) {
    this.products = products;
    this.calculateTotalItems();
    this.calculateTotalPrice();
  },

  calculateTotalItems() {
    if (this.products) {
      this.totalItems = this.products.length;
    }
  },

  calculateTotalPrice() {
    if (this.products) {
      let price = 0;
      this.products.forEach((product) => {
        if (product.price) {
          price += product.price;
        }
      });
      this.totalPrice = price;
    }
  },
};

export default ProductTotals;
