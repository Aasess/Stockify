const baseURL = {
    stock: '/api/stock',
  };
  
  export const StockEndPoint = {
    stocks: baseURL.stock,
    stockById: `${baseURL.stock}/id`,
  }