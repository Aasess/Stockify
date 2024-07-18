const baseURL = {
    stock: '/api/stock',
  };
  
  export const StockEndPoint = {
    stocks: baseURL.stock,
    stockById: `${baseURL.stock}/id`,
    // You can add more endpoints here if needed
  };