import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [booksData, genresData] = await Promise.all([
        getBooks(),
        getGenres(),
      ]);

      setBooks(booksData);
      setGenres(genresData);
    };

    fetchData();
  }, []);

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.name : "Unknown";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Book Store
        </h2>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className="group rounded-xl border border-gray-200 bg-white p-4 shadow-md transition hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-md bg-gray-100">
                  <Link to={`/books/show/${book.id}`}>
                    <img
                      src={`${bookImageStorage}/${book.cover_photo}`}
                      alt={book.title}
                      className="h-full w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </Link>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/books/show/${book.id}`}
                    className="block text-lg font-semibold text-gray-900 hover:underline dark:text-white"
                  >
                    {book.title}
                  </Link>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {getGenreName(book.genre_id)}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                      {formatPrice(book.price)}
                    </span>
                    <Link
                      to={`/books/show/${book.id}`}
                      className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      View Detail →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No books found.
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Show more
          </button>
        </div>
      </div>
    </section>
  );
}
