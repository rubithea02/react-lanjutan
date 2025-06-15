import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_services/authors";

export default function AuthorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    _method: "PUT",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showAuthor(id);
        setFormData({
          name: data.name,
          _method: "PUT",
        });
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }
      await updateAuthor(id, payload);
      navigate("/admin/authors");
    } catch (error) {
      console.error("Failed to update author:", error);
      alert("Error updating author");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Author</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Save Data
          </button>
        </form>
      </div>
    </section>
  );
}
