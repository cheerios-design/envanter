// scripts/main.js
import { ProductsAPI } from "./api/productsAPI.js";
import { ExchangeRateAPI } from "./api/exchangeRateAPI.js";
import { ProductCard } from "./components/ProductCard.js";

class EnvanterApp {
  constructor() {
    this.productsAPI = new ProductsAPI();
    this.exchangeAPI = new ExchangeRateAPI();
    this.products = [];
    this.filteredProducts = [];
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadProducts();
    await this.loadExchangeRates();
    await this.loadCategories();
  }

  setupEventListeners() {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu-2");

    mobileMenuButton?.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Search functionality
    const searchInput = document.getElementById("product-search");
    searchInput?.addEventListener("input", (e) =>
      this.handleSearch(e.target.value)
    );

    // Category filter
    const categoryFilter = document.getElementById("category-filter");
    categoryFilter?.addEventListener("change", (e) =>
      this.filterByCategory(e.target.value)
    );

    // Product detail buttons (using event delegation)
    const container = document.getElementById("products-container");
    container?.addEventListener("click", (e) => {
      if (e.target.matches("[data-product-id]")) {
        const productId = e.target.dataset.productId;
        this.showProductDetail(productId);
      }
    });
  }

  async loadProducts() {
    const container = document.getElementById("products-container");
    if (!container) return;

    // Show loading state
    container.innerHTML = this.getLoadingHTML();

    try {
      this.products = await this.productsAPI.getProducts();
      this.filteredProducts = [...this.products];
      this.renderProducts(this.filteredProducts);
    } catch (error) {
      this.showError("Failed to load products. Please try again later.");
    }
  }

  async loadCategories() {
    try {
      const categories = await this.productsAPI.getCategories();
      this.renderCategoryFilter(categories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  }

  renderCategoryFilter(categories) {
    const filterContainer = document.getElementById("category-filter");
    if (!filterContainer) return;

    const options = categories
      .map(
        (category) =>
          `<option value="${category}">${
            category.charAt(0).toUpperCase() + category.slice(1)
          }</option>`
      )
      .join("");

    filterContainer.innerHTML = `
      <option value="">All Categories</option>
      ${options}
    `;
  }

  async filterByCategory(category) {
    if (!category) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.category === category
      );
    }
    this.renderProducts(this.filteredProducts);
  }

  handleSearch(query) {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    }

    this.renderProducts(this.filteredProducts);
  }

  renderProducts(products) {
    const container = document.getElementById("products-container");
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12">
          <p class="text-gray-500">No products found matching your criteria.</p>
        </div>
      `;
      return;
    }

    const productCards = products
      .map((product) => {
        const card = new ProductCard(product);
        return card.render();
      })
      .join("");

    container.innerHTML = productCards;
  }

  async showProductDetail(productId) {
    try {
      const product = await this.productsAPI.getProductById(productId);
      // You can implement a modal or navigate to a detail page
      console.log("Product details:", product);
      // For now, just alert the details
      alert(
        `Product: ${product.title}\nPrice: $${product.price}\nDescription: ${product.description}`
      );
    } catch (error) {
      this.showError("Failed to load product details");
    }
  }

  getLoadingHTML() {
    return Array(6)
      .fill(0)
      .map(
        () => `
      <div class="skeleton-card">
        <div class="skeleton h-48 mb-4"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text w-1/2"></div>
      </div>
    `
      )
      .join("");
  }

  async loadExchangeRates() {
    try {
      const rates = await this.exchangeAPI.getRates();
      this.displayExchangeRates(rates);
    } catch (error) {
      console.error("Failed to load exchange rates:", error);
    }
  }

  displayExchangeRates(data) {
    const ratesContainer = document.getElementById("exchange-rates");
    if (!ratesContainer || !data.rates) return;

    const currencies = ["EUR", "GBP", "TRY"];
    const ratesHTML = currencies
      .map(
        (currency) => `
      <div class="rate-item bg-white px-4 py-2 rounded-lg shadow-sm">
        <span class="font-accent text-sm text-gray-600">1 USD = ${data.rates[
          currency
        ].toFixed(2)} ${currency}</span>
      </div>
    `
      )
      .join("");

    ratesContainer.innerHTML = ratesHTML;
  }

  showError(message) {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span class="block sm:inline">${message}</span>
        </div>
      `;

      // Auto-hide after 5 seconds
      setTimeout(() => {
        errorContainer.innerHTML = "";
      }, 5000);
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new EnvanterApp();
});
// This code initializes the EnvanterApp class when the DOM is fully loaded.
// It sets up event listeners, loads products, exchange rates, and categories,
