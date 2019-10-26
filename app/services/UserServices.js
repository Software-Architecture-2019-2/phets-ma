import { handleResponse, API_GATEWAY_URI } from './utils';

function loginService(user) {

  console.log(user.username);
  console.log(user.password);
  const b = `
    mutation{
        login(credentials: {username: "${user.username}", password: "${user.password}"}){
            token
        }
    }`;

  const requestOptions = {
    method: "POST",
    body: b
  };

  return fetch(API_GATEWAY_URI, requestOptions)
    .then(handleResponse)
    .then(response => {
      console.log(response);
      return response;
    });
}

export function getUserByUsernameService(username, callbackService) {
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
        password
      }
  }`;
  const body = {
    query,
    variables: { username }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.userByUsername)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function getUserAnimals(username, callbackService) {
  const query = `query AllAnimalsByUser($username: String!){
    allAnimalsByUser(username: $username){
      id,
      name,
      breed,
      gender,
      adoption,
      birthdate,
      animal_type{
        value
      },
      media
    }
  }`;

  const body = {
    query,
    variables: { username }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data ? data.data.allAnimalsByUser : null)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function updateUserService(user, callbackService) {
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
    callback: (data) => callbackService(data.data.updateUser)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function getAllCountriesService(callbackService) {
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

export { loginService };