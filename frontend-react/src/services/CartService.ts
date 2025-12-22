import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    brand: string;
    rating: number;
    image: string;
    countInStock: number;
    created_at: string;
    updated_at: string;
  };
}

export const getCartItems = async (): Promise<CartItem[]> => {
  const token = localStorage.getItem("access_token");

  const response = await axios.get(`${API_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data.data ?? response.data;
};
