import { React, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import swal from "sweetalert";
import bookserevice from "../services/book.service";
import search from "../assests/images/search-svgrepo-com (1).svg"
const BookList = (props) => {
  // UseNavigate to move other components
  const navigate = useNavigate();

  // set states for Book
  const [book, setBook] = useState([]);
  const [initialBooks, setInitialBooks] = useState([]);

  useEffect(() => {
    //Api call to fetch All Book data
    const geAllbook = async () => {
      bookserevice
        .getallbooks()
        .then((response) => {
          setBook(response.data.book);
          setInitialBooks(response.data.book);
        })
        .catch((error) => {
          console.log("Err", error);
        });
    };
    geAllbook();
    // eslint-disable-next-line
  }, []);

  //Function to go to Update page with Book id
  const updatebook = async (bookId) => {
    navigate("/update/" + bookId);
  };

  //Delete Book with Specified Id
  const deletebook = async (bookId) => {
    //Use Sweet Alert popup modal for Delete confirmation
    swal({
      title: "Are you sure?",
      text: "Once deleted, This action cannot be undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        bookserevice.remove(bookId).then((response) => {
          swal("Book Deleted successfully!", {
            icon: "success",
          });
        });
        window.location.reload();
      } else {
        swal("Your data is safe!");
      }
    });
  };
  //Setting up column header
  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Genre",
        accessor: "genre",
      },
      {
        Header: "published Year",
        accessor: "publishedYear",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
          const bookId = row.original._id;

          return (
            <div>
              <button
                type="button"
                className="mr-2 px-3 py-2.5 bg-blue-600 text-white font-medium text-xs uppercase rounded-lg hover:bg-blue-500 hover:shadow-lg active:bg-blue-600 active:shadow-lg"
                onClick={() => updatebook(bookId)}
              >
                Edit
              </button>
              <button
                type="button"
                className="px-3 py-2.5 bg-red-500 text-white font-medium text-xs uppercase rounded-lg hover:bg-red-700 hover:shadow-lg active:bg-red-700 active:shadow-lg"
                onClick={() => deletebook(bookId)}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: book,
    });
  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      return setBook(initialBooks);
    }
    var filterbooks = book.filter((item) => {
      const search = item.title.toLowerCase().includes(e.target.value.toLowerCase())
      return search;
    })
    setBook(filterbooks)
  }
  return (
    <>
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow  overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="my-4 ml-4 text-medium font-bold text-slate-800 uppercase ">
                Books Data
              </div>
              <div className="px-4 my-3">
                <div className="flex w-[20%] items-center border rounded p-2">
                  <span className="text-gray-500">
                    <img className="w-5 h-5 ml-2" src={search} />
                  </span>
                  <input
                    type="text"
                    className="outline-none ml-2 border-none p-2 w-full"
                    placeholder="Search..."

                    onChange={handleSearch}

                  />
                </div>
              </div>
              <table
                className="min-w-full divide-y divide-gray-300"
                // apply the table props
                {...getTableProps()}
              >
                <thead className="bg-gray-50">
                  {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                      // Apply the header row props
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                          //Loop over the headers in each row
                          headerGroup.headers.map((column) => (
                            // Apply the header cell props
                            <th
                              className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase "
                              {...column.getHeaderProps()}
                            >
                              {
                                // Render the header
                                column.render("Header")
                              }
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                {/* Apply the table body props  */}
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {
                    // Loop over the table rows
                    rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        // Apply the row props
                        <tr
                          {...row.getRowProps()}
                          className="divide-x divide-gray-100"
                        >
                          {row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {
                                  //Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookList;
