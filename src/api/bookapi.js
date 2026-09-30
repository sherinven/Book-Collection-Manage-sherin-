import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBook = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateBook = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};