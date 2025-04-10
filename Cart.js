import CartItem from "./CartItem.js";

export default class Cart {
  constructor(containerId, totalId) {
    this.container = document.querySelector(containerId);
    this.totalContainer = document.querySelector(totalId);
    this.items = [];
    this.render();
  }
  
  addProduct(product) {
    // Ha már létezik a kosárban a termék, csak növeljük a mennyiséget
    const existingItem = this.items.find(item => item.product.id === product.id);
    if(existingItem) {
      existingItem.increase();
    } else {
      this.items.push(new CartItem(product));
    }
    this.render();
  }
  
  removeProduct(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.render();
  }
  
  updateQuantity(productId, delta) {
    const item = this.items.find(item => item.product.id === productId);
    if(item) {
      if(delta > 0) {
        item.increase();
      } else {
        item.decrease();
      }
    }
    this.render();
  }
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.getSubTotal(), 0);
  }
  
  render() {
    this.container.innerHTML = "";
    this.items.forEach(item => {
      const div = document.createElement("div");
      div.className = "d-flex justify-content-between align-items-center border-bottom py-2";
      div.innerHTML = `
        <div>
          <strong>${item.product.name}</strong><br>
          ${item.product.price} Ft x 
          <input type="number" value="${item.quantity}" min="1" style="width: 60px;" data-id="${item.product.id}" class="qty-input">
          = ${item.getSubTotal()} Ft
        </div>
        <div>
          <button class="btn btn-sm btn-primary increase" data-id="${item.product.id}">+</button>
          <button class="btn btn-sm btn-secondary decrease" data-id="${item.product.id}">-</button>
          <button class="btn btn-sm btn-danger remove" data-id="${item.product.id}">X</button>
        </div>
      `;
      this.container.appendChild(div);
    });
    this.totalContainer.innerHTML = `Összesen: ${this.getTotal()} Ft`;
    this.addEventListeners();
  }
  
  addEventListeners() {
    // Mennyiség input módosítása
    this.container.querySelectorAll(".qty-input").forEach(input => {
      input.addEventListener("change", (e) => {
        const id = parseInt(e.target.dataset.id);
        let newQty = parseInt(e.target.value);
        const item = this.items.find(item => item.product.id === id);
        if(item) {
          item.quantity = newQty < 1 ? 1 : newQty;
          this.render();
        }
      });
    });
    
    // Gomb események
    this.container.querySelectorAll(".increase").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        this.updateQuantity(id, 1);
      });
    });
    this.container.querySelectorAll(".decrease").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        this.updateQuantity(id, -1);
      });
    });
    this.container.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        this.removeProduct(id);
      });
    });
  }
}
