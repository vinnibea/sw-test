import axios from "axios";
//instance of axios with base url
const $axios = axios.create({
    baseURL: 'https://sw-api.starnavi.io/'
  });

  export default $axios;