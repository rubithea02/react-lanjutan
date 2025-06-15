import {API} from "../_api";

// === Author Functions ===

export const getAuthors = async () => {
  try {
    const { data } = await API.get("/authors");
    return data.data;
  } catch (error) {
    console.error("Get authors failed:", error.response?.data || error.message);
    throw error;
  }
};

export const createAuthor = async (authorData) => {
  try {
    const response = await API.post("/authors", authorData);
    return response.data;
  } catch (error) {
    console.error("Create author failed:", error.response?.data || error.message);
    throw error;
  }
};

export const updateAuthor = async (id, authorData) => {
  try {
    const response = await API.post(`/authors/${id}`, authorData);
    return response.data;
  } catch (error) {
    console.error("Update author failed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    await API.delete(`/authors/${id}`);
  } catch (error) {
    console.error("Delete author failed:", error.response?.data || error.message);
    throw error;
  }
};

export const showAuthor = async (id) => {
  try {
    const { data } = await API.get(`/authors/${id}`);
    return data.data;
  } catch (error) {
    console.error("Show author failed:", error.response?.data || error.message);
    throw error;
  }
};

// === Book Functions ===

export const showBook = async (id) => {
  try {
    const response = await API.get(`/books/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Show book failed:", error.response?.data || error.message);
    throw error;
  }
};

export const updateBook = async (id, data) => {
  try {
    const response = await API.post(`/books/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update book failed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await API.delete(`/books/${id}`);
  } catch (error) {
    console.error("Delete book failed:", error.response?.data || error.message);
    throw error;
  }
};
