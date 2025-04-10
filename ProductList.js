import Product from "./Product.js";
import { PRODUCTS } from "./dataProducts.js";

export default class ProductList {
  constructor(containerId, cartInstance) {
    this.container = document.querySelector(containerId);
    this.cart = cartInstance;
    // terméklistát Product osztály példányainak tömbjeként tároljuk
    this.products = PRODUCTS.map(prod => new Product(prod.id, prod.name, prod.description, prod.price));
    this.filteredProducts = this.products;
    this.render();
    this.addEventListeners();
  }
  
  render() {
    this.container.innerHTML = "";
    this.filteredProducts.forEach(product => {
      // Bootstrap kártya stílusú megjelenítés
      const card = document.createElement("div");
      card.className = "col-md-6 mb-3";
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text font-weight-bold">${product.price} Ft</p>
            <button class="btn btn-success add-to-cart" data-id="${product.id}">Kosárba</button>
          </div>
        </div>
      `;
      this.container.append(card);
    });
  }
  
  addEventListeners() {
    // Kosárba pakolás gomb esemény
    this.container.addEventListener("click", (e) => {
      if(e.target.classList.contains("add-to-cart")) {
        const prodId = parseInt(e.target.dataset.id);
        const product = this.products.find(p => p.id === prodId);
        this.cart.addProduct(product);
      }
    });
  }
  
  filterProducts(query) {
    query = query.toLowerCase();
    this.filteredProducts = this.products.filter(prod => prod.name.toLowerCase().includes(query));
    this.render();
  }
}
