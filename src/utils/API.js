
import axios from 'axios';
import { BASE_URL_API } from '../Config';

export default axios.create({
    baseURL: BASE_URL_API,
    responseType: 'json'
});