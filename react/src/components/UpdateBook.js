import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bookserevice from "../services/book.service";
import { Link } from "react-router-dom";

const Update = () => {
  // initialize book value
  const initialBookState = {
    title: "",
    author: "",
    genre: "",
    publishedYear: 0,
  };
  //set states for book
  const [book, setBook] = useState(initialBookState);
  const [message, setMessage] = useState("");

  //Get ID from url
  const { id } = useParams();
  //Get api call  to get book with id who's value will be update
  const getbook = async () => {
    bookserevice
      .getbookbyid(id)
      .then((response) => {
        console.log("data", response.data.book);
        setBook(response.data.book);
      })
      .catch((error) => {
        console.log("Err", error);
      });
  };
  useEffect(() => {
    getbook();
    // eslint-disable-next-line
  }, []);

  //Onchange handler for input field value
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };
  //Update book
  const updatebook = () => {
    bookserevice
      .update(id, book)
      .then((response) => {
        setMessage("updated successfully!");
        window.location.href = "/books"
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="bg-no-repeat	bg-cover bg-center bg-new-image">
        <div className="flex flex-col items-center px-6 py-4 mx-auto md:h-screen lg:py-0">
          <div className="m-10 w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-4 md:space-y-6 sm:p-8">
              {book ? (
                <div>
                  <div className="mb-4 text-xl font-bold  text-black-600 md:text-2xl">
                    <h4>{book.title}</h4>
                  </div>
                  <form>
                    <div className="">
                      <input
                        type="text"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        id="title"
                        name="title"
                        value={book.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className=" mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="genre"
                        name="genre"
                        value={book.genre}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="publishedYear"
                        name="publishedYear"
                        value={book.publishedYear}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="md:ml-16  mt-8 w-60 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={updatebook}
                  >
                    Update
                  </button>
                  <p className="mt-4 text-green-600 font-bold">{message}</p>

                  <Link to={`/books`} className="mt-4  font-md text-green-600">
                    Back to Book Data
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
