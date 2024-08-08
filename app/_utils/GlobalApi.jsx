const axios = require('axios');

const axiosClient = axios.create({
    baseURL:"http://localhost:1337/api/"
})

const getCategory =() => {
  return  axiosClient.get('/categories')
}

export default {getCategory}