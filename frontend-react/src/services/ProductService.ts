import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

interface GetAllProductsParams {
  search?: string;
  price_min?: number;
  price_max?: number;
  rating_min?: number;
  rating_max?: number;
  sort?: string;
  page?: number;
  per_page?: number;
}

export const getAllProducts = async (params: GetAllProductsParams = {}) => {
  const response = await axios.get(`${API_URL}/api/products`, { params });
  return response.data;
};
export const getProductDetail = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/products/${id}`);
  return response.data;
};