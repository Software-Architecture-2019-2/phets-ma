import { request } from 'graphql-request';
import { API_GATEWAY_URI } from './utils'

function loginService(user) {

  const query = `mutation {
        login(credentials: {username: "${user.username}", password: "${user.password}"}){
            token
        }
      }`;

  return request(API_GATEWAY_URI, query)
    .then(data => {
      return data.login.token;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function registerService(user) {

  const query = `
  mutation {
    register(user: {firstName: "${user.firstName}", lastName: "${user.lastName}", username: "${user.username}", email: "${user.email}", password: "${user.password}"}){
      firstName,
      lastName,
      username,
      email,
      id
    }
  }`;

  return request(API_GATEWAY_URI, query)
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("Error: " + error);
      return null;
    });
}

function logoutService(token, callbackService){

  const query = `mutation{
    destroySession(token: { token: "${token}" })
  }`;
  const body = {
    query
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data)
  };
  try {
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }
}

function getUserByUsernameService(user, callbackService) {
  const query = `query UserByUsername($username: String!){
      userByUsername(username: $username){
        firstName,
        lastName,
        username,
        email,
        description,
        city,
        country{
          id,
          name,
        },
        media,
        password,
        id
      }
  }`;
  const body = {
    query,
    variables: { username: user.username }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.userByUsername)
  };
  try {
    sendRequest(request, user.token);
  } catch (error) {
    console.error(error);
  }
}

function getUserAnimals(user, callbackService) {
  const query = `query AllAnimalsByUser($username: String!){
    allAnimalsByUser(username: $username){
      id,
      name,
      breed,
      gender,
      adoption,
      birthdate,
      animal_type{
        id,
        value
      },
      media
    }
  }`;

  const body = {
    query,
    variables: { username: user.username }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data ? data.data.allAnimalsByUser : null)
  };
  try {
    sendRequest(request, user.token);
  } catch (error) {
    console.error(error);
  }
}

function updateUserService(user, token, callbackService) {
  const query = `mutation UpdateUser($username: String!, $user: UserInput!){
    updateUser(username: $username, user: $user){
      firstName,
      lastName,
      username,
      email,
      description,
      city,
      country{
        id,
        name,
      },
      media,
      password
    }
  }`;

  const body = {
    query,
    variables: { username: user.username, user }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => {
      callbackService(data.data.updateUser)
    }};
  
  try {
    sendRequest(request, token);
  } catch (error) {
    console.error(error);
  }
}

function getAllCountriesService(token, callbackService) {
  const query = `query{
    allCountries{
      id,
      name
    }
  }`;
  const body = {
    query
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.allCountries)
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

export { loginService, 
  registerService, 
  getUserByUsernameService,
  updateUserService,
  getAllCountriesService,
  getUserAnimals,
  logoutService
};