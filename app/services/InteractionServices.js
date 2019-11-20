import { API_GATEWAY_URI } from './utils';
import { request } from 'graphql-request';


export function getAllPhetsService(filter, token, callbackService) {
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
    callback: (data) => {
      console.log(data); 
      callbackService(data.data.allPhets)
    }
  };
  try {
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }
}

export function createInteractionService(data, callbackService) {
  const query = `
    mutation {
        createInteraction(id1: ${data.id1}, id2: ${data.id2}, state: ${data.state}){
            id
            idMain
            idSecondary
        }
    }`;

  const body = {
    query
  }
  const request = {
    method: "POST",
    headers: {
      "Authentication": `Bearer ${data.token}`
    },
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.createInteraction)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }

  // request(API_GATEWAY_URI, body)
  //   .then(data => {
  //     callbackService(data.createInteraction);
  //   })
  //   .catch(error => {
  //     return Promise.reject(error);
  //   });
}

export function isMatchService(data, callbackService) {
  const query = `
    query {
        match(id1: ${data.id1}, id2: ${data.id2}){
            state
        }
    }`;

  const body = {
    query
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.matchHistory)
  };
  try {
    sendRequest(request, data.token);
  } catch (error) {
    console.error(error);
  }
  // request(API_GATEWAY_URI, body)
  //   .then(data => {
  //     callbackService(data.match);
  //   })
  //   .catch(error => {
  //     return Promise.reject(error);
  //   });
}

export function matchHistoryService(id, token, callbackService) {
  const query = `query MatchHistory($id: Int!){
    matchHistory(id1: $id){
      idMain,
      idSecondary,
      match1,
      match2,
    }
  }`;

  const body = {
    query,
    variables: { id }
  }
  const request = {
    method: "POST", 
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.matchHistory)
  };
  try {
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }
}

function sendRequest(request, token) {
  fetch(API_GATEWAY_URI, {
    method: request.method,
    body: request.body,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      request.callback(responseJson)
    });
}