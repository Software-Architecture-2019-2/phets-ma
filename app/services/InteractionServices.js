import { API_GATEWAY_URI } from './utils';
import { request } from 'graphql-request';

function likeService(id1, id2, state) {

    const b = `
    mutation {
        createInteraction(id1: ${id1}, id2: ${id2}, state: ${state}){
            id
            idMain
            idSecondary
        }
    }`;
  
    return request(API_GATEWAY_URI, b)
      .then(data => {
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
}

export { likeService };