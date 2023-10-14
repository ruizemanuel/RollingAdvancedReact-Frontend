import axios from "axios";


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_RESTAURANTE,
  timeout: 12000,
});

export default instance;
