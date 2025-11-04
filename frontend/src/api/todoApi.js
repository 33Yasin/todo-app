// src/api/todoApi.js
import axios from "axios";

const API_BASE = "http://localhost:4000/api/todos";

// Tüm görevleri getir
export const getTodos = async () => {
  const { data } = await axios.get(API_BASE);
  return data;
};

// Yeni görev oluştur
export const createTodo = async (todo) => {
  const { data } = await axios.post(API_BASE, todo);
  return data;
};

// Görev güncelle
export const updateTodo = async (id, todo) => {
  const { data } = await axios.put(`${API_BASE}/${id}`, todo);
  return data;
};

// Görev sil
export const deleteTodo = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};