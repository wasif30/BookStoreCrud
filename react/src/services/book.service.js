import http from "./http-common";

//Api call for Create book
const Createbook = async (title, author, genre, publishedYear) => {
  return http
    .post("/add-book", {
      title,
      author,
      genre,
      publishedYear,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Get Api call to show book with Id
const getbookbyid = async (id) => {
  return http
    .get(`/get-book/${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Get Api call to show all Books Data  from database
const getallbooks = async () => {
  return http
    .get("/get-book")
    .then(function (response) {
      if (response.data) {
      }
      // console.log("Response2", response);
      return response.data;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Update Api call to update Book
const update = (id, data) => {
  return http.patch(`/update-book/${id}`, data);
};

//Remove Book with Id
const remove = (id) => {
  return http.delete(`/delete-book/${id}`);
};

const bookserevice = {
  Createbook,
  getbookbyid,
  getallbooks,
  update,
  remove,
};

export default bookserevice;
