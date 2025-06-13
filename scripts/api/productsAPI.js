// This module provides an API client for fetching products from a fake store API.
// It includes methods to get products, product details, categories, and products by category.
export class ProductsAPI {
  constructor() {
    this.baseURL = "https://fakestoreapi.com";
  }

  async getProducts(limit = 20) {
    try {
      const response = await fetch(`${this.baseURL}/products?limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await fetch(`${this.baseURL}/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product details");
      return await response.json();
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await fetch(`${this.baseURL}/products/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      const response = await fetch(
        `${this.baseURL}/products/category/${category}`
      );
      if (!response.ok) throw new Error("Failed to fetch products by category");
      return await response.json();
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  }
}
