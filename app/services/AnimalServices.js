import { API_GATEWAY_URI } from './utils'

export function createAnimalService(animal, callbackService) {
  const query = `mutation CreateAnimal($animal: AnimalInput!){
    createAnimal(animal: $animal){
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
    variables: { animal }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.createAnimal)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function updateAnimalService(id, animal, callbackService) {
  const query = `mutation UpdateAnimal($id: Int!,  $animal: AnimalInput!){
    updateAnimal(id: $id, animal: $animal){
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
    variables: { id, animal }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.updateAnimal)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function getAnimalsService(callbackService) {
  const query = `query{
    allAnimals{
      id
      user
      name
      breed
      gender
      adoption
      birthdate
      animal_type{
        id
        value
      }
      media
      
    }
  }`;

  const body = {
    query
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.allAnimals)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}


export function getAllAnimalTypesService(callbackService) {
  const query = `query{
    allAnimalTypes{
      id,
      value
    }
  }`;
  const body = {
    query
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.allAnimalTypes)
  };
  try {
    sendRequest(request);
  } catch (error) {
    console.error(error);
  }
}

export function deleteAnimalService(id, callbackService) {
  const query = `mutation DeleteAnimal($id: Int!){
    deleteAnimal(id: $id){
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
    variables: { id }
  }
  const request = {
    method: "POST",
    body: JSON.stringify(body),
    callback: (data) => callbackService(data.data.updateAnimal)
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
