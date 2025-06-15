
import {API} from "../_api"

export const getBooks = async () => {
  const { data } = await API.get("/books");
  return data.data; // pastikan struktur respons API seperti ini
}

export const createBook = async (bookData) => {
  try {
    const response = await API.post("/books", bookData);
    return response.data;
  } catch (error) {
    console.error("Create book failed:", error.response?.data || error.message);
    throw error;
  }
}

export const showBook = async (id) => {
  try {
    const response = await API.get(`/books/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBook = async (id, data) => {
  try {
    const response = await API.post(`/books/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await API.delete(`/books/${id}`);
  } catch (error) {
    throw error; // dilempar ke try/catch di komponen
  }
};

export const getAuthors = async () => {
  const { data } = await API.get("/authors"); // contoh asumsi endpoint
  return data.data;
};

export const getGenres = async () => {
  const { data } = await API.get("/genres"); // contoh asumsi endpoint
  return data.data;
};


