import axios, { AxiosResponse } from "axios";
import { LoginValues, RegisterValues, User } from "../features/user/user";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5105/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axiosInstance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axiosInstance.post<T>(url, body).then(responseBody),
};

export const Account = {
  login: (values: LoginValues) => requests.post<User>("/account/login", values),
  register: (values: RegisterValues) =>
    requests.post<User>("/account/register", values),
  current: () => requests.get<User>("/account"),
};
