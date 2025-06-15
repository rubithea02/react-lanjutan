import { useEffect, useState } from "react";
import { deleteAuthor, getAuthors } from "../../../_services/authors";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this author?");
  
    if (confirmDelete) {
      try {
        await deleteAuthor(id);
        setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
      } catch (error) {
        console.error("Failed to delete author:", error);
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Authors
          </h2>
          <Link
            to="/admin/authors/create"
            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            Add Author
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author) => (
                  <tr key={author.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{author.id}</td>
                    <td className="px-4 py-3">{author.name}</td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <Link
                        to={`/admin/authors/edit/${author.id}`}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(author.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-center">
                    Data author tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
