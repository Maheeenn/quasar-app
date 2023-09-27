import axios from 'axios';
import { apiKey } from './config'; // Import the apiKey from your config file

// Use apiKey in your Axios request headers
const api = axios.create({
  baseURL: 'https://newsapi.org/v2/', // Your API base URL
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
});

export default api;
