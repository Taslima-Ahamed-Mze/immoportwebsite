import axios from "axios";

export default axios.create({
  baseURL: "http://api.adif-info.fr/",
  headers: {
    "Content-type": "application/json",
  }
});