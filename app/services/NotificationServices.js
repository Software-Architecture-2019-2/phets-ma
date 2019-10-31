import { API_GATEWAY_URI } from './utils';

export function createNotification(notification) {
    const query = `
    mutation createNotification($notification: NotificationInput!){
        createNotification(notification: $notification){
            id,
            user_id,
            notification_body,
            notification_type,
            notification_state,    
        }
    }`;
  
    const body = {
      query,
      variables: { notification }
    }
    const request = {
      method: "POST",
      body: JSON.stringify(body),
      callback: () => callbackService()
    };
    try {
      sendRequest(request);
    } catch (error) {
      console.error(error);
    }
}

export function deleteNotification(id) {
    const query = `
    mutation deleteNotification($id: Int!){
        deleteNotification(id: $id){
            data  
        }
    }`;
  
    const body = {
      query,
      variables: { id }
    }
    const request = {
      method: "POST",
      body: JSON.stringify(body),
      callback: () => callbackService()
    };
    try {
      sendRequest(request);
    } catch (error) {
      console.error(error);
    }
}

export function udateStateNotification(id) {
    const query = `
    mutation updateStateNotification($id: Int!){
        updateStateNotification(id: $id){
            id
            user_id
            notification_body
            notification_type
            notification_state
        }
    }`;
  
    const body = {
      query,
      variables: { id }
    }
    const request = {
      method: "POST",
      body: JSON.stringify(body),
      callback: () => callbackService()
    };
    try {
      sendRequest(request);
    } catch (error) {
      console.error(error);
    }
}

export function sendEmail(email) {
    const query = `
    mutation sendEmail($email: EmailInput!){
        sendEmail(email: $email){
            data
        }
    }`;
  
    const body = {
      query,
      variables: { email }
    }
    const request = {
      method: "POST",
      body: JSON.stringify(body),
      callback: () => callbackService()
    };
    try {
      sendRequest(request);
    } catch (error) {
      console.error(error);
    }
}

export function showNotification(id) {
    const query = `
    query {
        showNotification(id: ${id}){
            id
            user_id
            notification_body
            notification_type
            notification_state
        }
    }`;
  
    const body = {
      query
    }
    const request = {
      method: "POST",
      body: JSON.stringify(body)
    };
    try {
      sendRequest(request);
    } catch (error) {
      console.error(error);
    }
}

export function userNotifications(id) {
    const query = `
    query {
        userNotifications(id: ${id}){
            id
            user_id
            notification_body
            notification_type
            notification_state
        }
    }`;
  
    const body = {
      query
    }
    const request = {
      method: "POST",
      body: JSON.stringify(body)
    };
    try {
      sendRequest(request);
    } catch (error) {
      console.error(error);
    }
}