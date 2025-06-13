export class ExchangeRateAPI {
  constructor() {
    this.baseURL = "https://api.exchangerate-api.com/v4/latest/USD";
  }

  async getRates() {
    try {
      const response = await fetch(this.baseURL);
      if (!response.ok) throw new Error("Failed to fetch exchange rates");
      return await response.json();
    } catch (error) {
      console.error("Error fetching rates:", error);
      throw error;
    }
  }
}
