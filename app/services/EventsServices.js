import { API_GATEWAY_URI } from './utils'

export function createEventService(event, callbackService) {
  const query = `mutation CreateEvent($event: EventInput!){
    createEvent(event: $event){
      id
    }
  }`;
  const body = {
    query,
    variables: { event }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.createEvent)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function editEventService(id, event, callbackService) {
  const query = `mutation UpdateEvent($id: String!, $event: EventInput!){
    updateEvent(id: $id, event: $event){
      id
    }
  }`;
  const body = {
    query,
    variables: { id, event }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.updateEvent)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function removeEventService(id, callbackService) {
  const query = `mutation RemoveEvent($id: String!){
    deleteEvent(id: $id){
      id
    }
  }`;
  const body = {
    query,
    variables: { id }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.deleteEvent)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function getAllEvents(callbackService) {
  const query = `query{
    allEvents{
      total
      list{
        id
        subject
        description
        date
        animal_id
      }
    }
  }`;
  const body = {
    query
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.allEvents.list)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
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