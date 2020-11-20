import axios from 'axios';

const api = axios.create({
    baseURL: 'https://app.tractian.com/api/test.json',
    
});


export default api;
