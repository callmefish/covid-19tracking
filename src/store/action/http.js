import axios from "axios";

const HTTP = axios.create({
    baseURL:"https://api.covidtracking.com/v1",
    // withCredentials: true,
    // transformRequest:(data)=>{
    //     return data
    // }
});
export default HTTP;