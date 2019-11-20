import firestore from '@react-native-firebase/firestore';
import { API_GATEWAY_URI } from './utils';

export function createMessageService(message, token, callbackService) {
  const query = `mutation CreateMessage($message: MessageInput!){
    createMessage(message: $message){
      data
    }
  }`;

  if (typeof message.sent === 'number') message.sent = message.sent.toString(10);
  if (typeof message.received === 'number') message.received = message.received.toString(10);

  const body = {
    query,
    variables: {
      message: {
        sent: message.sent,
        received: message.received,
        content: message.messages,
        adopt: message.adopt,
      }
    }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.createMessage)
  };
  try {
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }

}

export function getAdoptionChatsService(entity, token, callback) {
  if(typeof entity === 'number') entity  = entity.toString(10);
  firestore().collection('adoptChatList')
    .doc(entity)
    .collection('users').get()
    .then(snapshot => {
      const ids = []
      snapshot.forEach(doc => {
        ids.push(doc.id);
      });
      callback(ids);
    })
}

export function getMessagesService(entity1, entity2, token, callback) {
  if (typeof entity1 === 'number') entity1 = entity1.toString(10);
  if (typeof entity2 === 'number') entity2 = entity2.toString(10);

  console.log(entity1, entity2);

  const query1 = firestore().collection('channels')
    .doc(entity1)
    .collection(entity2).orderBy('time', 'asc');
  const query2 = firestore().collection('channels')
    .doc(entity2)
    .collection(entity1).orderBy('time', 'asc');

  query1.get()
    .then(snapshot => {
      const messages = []
      if (snapshot.docs.length) {
        snapshot.forEach(doc => {
          messages.push(doc.data());
        });
        callback(messages);
      } else {
        query2.get().then(data => {
          data.forEach(doc => {
            messages.push(doc.data());
          });
          callback(messages);
        })
      }
    })
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