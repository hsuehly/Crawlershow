import axios from 'axios'


const instance = axios.create({
  baseURL: '/'
})
instance.interceptors.response.use((responese)=>{
  return responese.data;
})

export default instance