import * as axios from 'react-native-axios';

var axiosInstance = axios.create({
    baseURL: 'https://nursing-portal-api-2m2hfehjyq-uw.a.run.app/nursing-portal/',
    timeout: 60000,
    headers: {'Content-Type': 'application/json'},
    
  });
console.log(axiosInstance.baseURL)


axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export { axiosInstance as default };