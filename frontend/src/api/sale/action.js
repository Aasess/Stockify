import { SaleEndPoint } from './endpoint'; // Adjust path as needed
import apiClient from '../apiClient'; // Adjust path as needed

class SaleAction {
  static async findAllSales() {
    try {
      const response = await apiClient.get(SaleEndPoint.sales);
      return response.data?.data;
    } catch (error) {
      throw error;
    }
  }

  static async findSaleById(id) {
    try {
      const response = await apiClient.get(
        SaleEndPoint.saleById.replace('id', id)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createNewSale(formData) {
    try {
      const response = await apiClient.post(SaleEndPoint.sales, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateSaleById(id, formData) {
    try {
      const response = await apiClient.put(
        SaleEndPoint.saleById.replace('id', id),
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSaleById(id) {
    try {
      const response = await apiClient.delete(
        SaleEndPoint.saleById.replace('id', id)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default SaleAction;
