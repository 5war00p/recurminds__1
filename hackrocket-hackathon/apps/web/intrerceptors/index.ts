import axios from "axios";

const interceptedAxios = axios.create();

// interceptedAxios.defaults.headers.common["x-dev-profile-access-token"] =
//   (window && window.localStorage.getItem("access_token")) || "";

interceptedAxios.defaults.baseURL = "http://44.202.133.235:9080/";
interceptedAxios.interceptors.request.use(
  (config) => {
    if (config?.headers) {
      config.headers["x-dev-profile-access-token"] =
        (window && window.localStorage.getItem("access_token")) || "";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interceptedAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { interceptedAxios };
