import API from "../_api";

export const getGenres = async () => {
  const { data } = await API.get("/genres");
  return data.data;
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
