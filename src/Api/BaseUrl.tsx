import axios from "axios";
export default axios.create({
  baseURL: "http://api.immopport.cda.ve.manusien-ecolelamanu.fr/api/public/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});