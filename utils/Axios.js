import axios from "axios";

const Axios = axios.create({
baseURL: "https://course.cpetdhiu.in/api/v1",
// baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  withCredentials: true,

});

export default Axios;