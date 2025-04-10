import ProductList from "./ProductList.js";
import Cart from "./Cart.js";

document.addEventListener("DOMContentLoaded", () => {
  // Kosár példányosítása
  const cart = new Cart("#cartItems", "#cartTotal");
  // Terméklista példányosítása, a kosár átadva
  const productList = new ProductList("#products", cart);
  
  // Keresési funkció
  const searchInput = document.querySelector("#searchInput");
  const searchBtn = document.querySelector("#searchBtn");
  
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    productList.filterProducts(query);
  });
});
