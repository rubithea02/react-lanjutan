import {API}  from "../_api";

// === Genre Functions ===

export const getGenres = async () => {
  try {
    const { data } = await API.get("/genres");
    return data.data;
  } catch (error) {
    console.error("Get genres failed:", error.response?.data || error.message);
    throw error;
  }
};

export const createGenre = async (genreData) => {
  try {
    const response = await API.post("/genres", genreData);
    return response.data;
  } catch (error) {
    console.error("Create genre failed:", error.response?.data || error.message);
    throw error;
  }
};

export const updateGenre = async (id, genreData) => {
  try {
    const response = await API.post(`/genres/${id}`, genreData);
    return response.data;
  } catch (error) {
    console.error("Update genre failed:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    await API.delete(`/genres/${id}`);
  } catch (error) {
    console.error("Delete genre failed:", error.response?.data || error.message);
    throw error;
  }
};

export const showGenre = async (id) => {
  try {
    const { data } = await API.get(`/genres/${id}`);
    return data.data;
  } catch (error) {
    console.error("Show genre failed:", error.response?.data || error.message);
    throw error;
  }
};
