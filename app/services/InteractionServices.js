import { API_GATEWAY_URI } from './utils';
import { request } from 'graphql-request';

export function getAllPhetsService(filter, callbackService) {
  const query = `query AllPhets($filter: PhetsFilter!){
    allPhets(filter: $filter){
      id,
      name,
      user,
      breed,
      gender,
      adoption,
      birthdate,
      animal_type{
        id,
        value
      },
      media,  
    }
  }`;

  const body = {
    query,
    variables: { filter }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.allPhets)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function createInteractionService(data, callbackService) {
  const body = `
    mutation {
        createInteraction(id1: ${data.id1}, id2: ${data.id2}, state: ${data.state}){
            id
            idMain
            idSecondary
        }
    }`;

  request(API_GATEWAY_URI, body)
    .then(data => {
      callbackService(data.createInteraction);
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

export function isMatchService(data, callbackService) {
  const body = `
    query {
        match(id1: ${data.id1}, id2: ${data.id2}){
            state
        }
    }`;

  request(API_GATEWAY_URI, body)
    .then(data => {
      callbackService(data.match);
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function sendRequest(request) {
  fetch(API_GATEWAY_URI, {
    method: request.method,
    body: request.body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      request.callback(responseJson)
    });
}