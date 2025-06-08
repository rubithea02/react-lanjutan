import API from "../_api"

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

