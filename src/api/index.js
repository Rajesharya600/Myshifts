import axios from 'axios';
import * as Strings from '../utils/constants';

export async function fetchApi(data,method) {
 return await axios({
        method: method,
        url: Strings.baseURL+data,
        timeout: 30000,
    })
    .then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.log(error)
      }) 
}