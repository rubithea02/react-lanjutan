import API from "../_api"

export const getAuthors = async () => {
  const {data} = await API.get("/authors")
  return data.data;
}

export const createAuthor = async (authorData) => {
  try {
    const response = await API.post("/authors", authorData);
    return response.data;
  } catch (error) {
    console.error("Create author failed:", error.response?.data || error.message);
    throw error;
  }
}