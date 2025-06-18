import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDecodeToken } from "../_services/auth";

export default function AdminLayout() {
  const navigate = useNavigate();

  // Ambil token dan user info dari localStorage
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const decodedToken = useDecodeToken(token);

  useEffect(() => {
    const isTokenInvalid = !token || !decodedToken || !decodedToken.success;
    const isNotAdmin = !userInfo?.role || userInfo.role !== "admin";

    if (isTokenInvalid) {
      return navigate("/login");
    }

    if (isNotAdmin) {
      return navigate("/");
    }
  }, [token, decodedToken, userInfo, navigate]);

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          {/* Brand & Toggle */}
          <div className="flex justify-start items-center">
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                ></path>
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <Link
              to="https://flowbite.com"
              className="flex items-center mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://flowbite.s3.amazonaws.com/logo.svg"
                className="mr-3 h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Toko Buku
              </span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center lg:order-2">
            <button
              type="button"
              className="flex mx-3 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                alt="user avatar"
              />
            </button>

            {/* Dropdown */}
            <div
              className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded-xl divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown"
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {userInfo?.name || "Admin"}
                </span>
                <span className="block text-sm text-gray-900 truncate dark:text-white">
                  {userInfo?.email || "admin@example.com"}
                </span>
              </div>
              <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
              >
                <li>
                  <Link
                    to="/signout"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            {[
              { label: "Overview", to: "/admin", icon: "home" },
              { label: "Users", to: "/admin/users", icon: "user" },
              { label: "Authors", to: "/admin/authors", icon: "pen" },
              { label: "Genres", to: "/admin/genres", icon: "tag" },
              { label: "Books", to: "/admin/books", icon: "book" },
              { label: "Transaction", to: "/admin/transactions", icon: "credit-card" },
            ].map(({ label, to }, idx) => (
              <li key={idx}>
                <Link
                  to={to}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Page Content */}
      <main className="md:ml-64 pt-20 p-4">
        <Outlet />
      </main>
    </div>
  );
}
