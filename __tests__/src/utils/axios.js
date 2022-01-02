/**
 * @description Axios Service Utility
 * @author Fahid Mohammad
 */

import axios from "axios";
import { navigate } from './navigation'
import common from '../stores/common'
import Auth from '../stores/auth'
import { getToken } from "./tokenUtil";

//  Set token to all header request on-demand
export function setToken(token) {
  if(token){
    axios.defaults.headers.common["Authorization"]=token;
  }
 
}
export function setLanguage(lang) {
  axios.defaults.headers.common["lang"]=lang;

}

export function setBuildVersion(){
  axios.defaults.headers.common['build-version']='1'
}

export async function setHeaders(key, value) {
  axios.defaults.headers.common[key]=value
}

axios.interceptors.request.use(
  async config => {
    let isLoggedin = await getToken()
    if(!isLoggedin) { delete config.headers.common.Authorization }
    return config;
  },
  error => Promise.reject(error)
);

// common response interceptor for services
axios.interceptors.response.use((response) => {
  const { status, data } = response 
  if( data && data.status===2000 && !Auth.sessionExpired ) {
    Auth.setSessionExpired()
  }
  return response
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  create: axios.create,
  setToken,
  setHeaders,
  setLanguage
};