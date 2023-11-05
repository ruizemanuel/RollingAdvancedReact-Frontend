import axios from "axios";


const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_RESTAURANTE,
  //baseURL: process.env.VITE_REACT_APP_API_RESTAURANTE, //descomentar y comentar el de VITE_REACT_APP_API_RESTAURANTE para hacer los test
  timeout: 12000,
});

export default instance;
