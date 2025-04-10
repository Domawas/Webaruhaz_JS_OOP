export default class Product {
    constructor(id, name, description, price) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
    }
    getDetails() {
      return `${this.name} - ${this.description} - ${this.price} Ft`;
    }
  }
  