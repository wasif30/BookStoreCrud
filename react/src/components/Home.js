import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
              My Bookstore
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:text-2xl">
            Browse our collection of books or add your own!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 mb-8">
            <div className="rounded-md shadow">
              <Link
                to="/books"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 md:py-4 md:text-lg md:px-10"
              >
                Browse Books
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/books/add"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10"
              >
                Add Book
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t-2 border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-gray-500">
            &copy; 2023 My Bookstore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
