import { API_GATEWAY_URI } from './utils'

export function createEventService(event, token, callbackService) {
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
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }
}

export function editEventService(id, event, token, callbackService) {
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
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }
}

export function removeEventService(id, token, callbackService) {
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
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }
}

export function getAllEventsService(token, callbackService) {
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
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }
}

function sendRequest(request, token = null) {
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