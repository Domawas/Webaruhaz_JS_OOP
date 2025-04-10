export default class CartItem {
    constructor(product, quantity = 1) {
      this.product = product;
      this.quantity = quantity;
    }
    
    increase() {
      this.quantity++;
    }
    
    decrease() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
    
    getSubTotal() {
      return this.product.price * this.quantity;
    }
  }
  