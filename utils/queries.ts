import { axiosInstance } from "./axios";

interface Product {
  id: number;
  date_created: string;
  date_modified: string;
  name: string;
  product_image: string;
  description: string;
  quantity: number;
  price: number;
}

export const getProducts = async () => {
  const res = await axiosInstance.get<{ results: Product[] }>("/product/product/");
  return res.data.results;
};

export const getProduct = async (id: number | string) => {
  const res = await axiosInstance.get<Product>(`/product/product/${id}`);
  return res.data;
};
