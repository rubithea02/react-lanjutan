export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-12">
        {/* Info Banner */}
        <div className="inline-flex items-center py-1 px-2 mb-6 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-200">
          <span className="text-xs bg-indigo-600 rounded-full text-white px-3 py-1 mr-3">
            New
          </span>
          <span className="font-medium">Discover our latest book releases</span>
        </div>

        {/* Headline & Subheadline */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Temukan Bacaan yang Mengubah Dunia
        </h1>
        <p className="mb-8 text-lg text-gray-600 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">
          Pilih dari ribuan judul fiksi, nonfiksi, dan literatur klasik—semua tersedia dengan harga terbaik dan pengiriman cepat.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/books"
            className="px-6 py-3 text-white bg-indigo-600 rounded-lg text-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500"
          >
            Jelajahi Buku
          </a>
          <a
            href="/books/new"
            className="px-6 py-3 text-indigo-600 bg-indigo-100 rounded-lg text-lg font-medium hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
          >
            New Arrivals
          </a>
        </div>

        {/* Visual Illustration */}
        <div className="mt-12">
          <img
            src="/assets/reading_illustration.svg"
            alt="Illustration of reading books"
            className="mx-auto w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
