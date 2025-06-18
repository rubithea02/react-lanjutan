import { useEffect, useState } from "react";
import { deleteBook, getBooks } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { Link } from "react-router-dom";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksData, genresData, authorsData] = await Promise.all([
          getBooks(),
          getGenres(),
          getAuthors(),
        ]);
        setBooks(booksData);
        setGenres(genresData);
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  const getGenreName = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : "Unknown Genre";
  };

  const getAuthorName = (id) => {
    const author = authors.find((author) => author.id === id);
    return author ? author.name : "Unknown Author";
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await deleteBook(id);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        {/* Header: Search & Add Button */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="search-books" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search-books"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search books..."
                />
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto">
            <Link
              to={"/admin/books/create"}
              className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add Book
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {book.title}
                    </td>
                    <td className="px-4 py-3">{book.price}</td>
                    <td className="px-4 py-3">{book.stock}</td>
                    <td className="px-4 py-3">
                      <img
                        src={book.cover_photo}
                        alt={book.title}
                        className="w-16 h-20 object-cover"
                      />
                    </td>
                    <td className="px-4 py-3">{getGenreName(book.genre_id)}</td>
                    <td className="px-4 py-3">{getAuthorName(book.author_id)}</td>
                    <td className="px-4 py-3 relative flex justify-end">
                      <button
                        onClick={() => toggleDropdown(book.id)}
                        className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      {openDropdownId === book.id && (
                        <div className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y shadow dark:bg-gray-700">
                          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                              <Link
                                to={`/admin/books/edit/${book.id}`}
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Edit
                              </Link>
                            </li>
                          </ul>
                          <div className="py-1">
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="block w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-3 text-center text-gray-500 dark:text-gray-300">
                    Tidak ada buku yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <nav
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900 dark:text-white">1–{filteredBooks.length}</span> dari{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{books.length}</span> buku
          </span>
        </nav>
      </div>
    </section>
  );
}
