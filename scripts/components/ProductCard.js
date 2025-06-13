export class ProductCard {
  constructor(product) {
    this.product = product;
  }

  render() {
    return `
      <div class="product-card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
        <div class="aspect-square bg-gray-100 relative">
          <img 
            src="${this.product.image}" 
            alt="${this.product.title}"
            class="w-full h-full object-contain p-4"
            loading="lazy"
          />
          <span class="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs">
            ${this.product.category}
          </span>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-heading font-semibold text-gray-900 line-clamp-2">
            ${this.product.title}
          </h3>
          <p class="text-gray-600 mt-2 text-sm line-clamp-3">${this.product.description}</p>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-2xl font-bold text-primary-600">$${this.product.price}</span>
            <div class="flex items-center">
              <span class="text-yellow-400">★</span>
              <span class="text-sm text-gray-600 ml-1">${this.product.rating.rate} (${this.product.rating.count})</span>
            </div>
          </div>
          <button 
            class="mt-4 w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            data-product-id="${this.product.id}"
          >
            View Details
          </button>
        </div>
      </div>
    `;
  }
}
