import axios from "axios";

//Make axios call common
export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});
