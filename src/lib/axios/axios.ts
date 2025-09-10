import axios from "axios";

const API_BASE: string =
  import.meta.env.REACT_APP_API_URL ?? "http://localhost:3000/";

const client = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default client;
