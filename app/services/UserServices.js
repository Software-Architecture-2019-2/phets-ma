import { login_address, countries } from "./address";
import { request } from 'graphql-request';

function loginService(user) {

    const b = `mutation {
        login(credentials: {username: "${user.username}", password: "${user.password}"}){
            token
        }
      }`;

    return request(login_address, b)
    .then(data => {
      return data.login.token;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function registerService(user) {

  const b = `
  mutation {
    register(user: {firstName: "${user.firstName}", lastName: "${user.lastName}", username: "${user.username}", email: "${user.email}", password: "${user.password}"}){
      firstName,
      lastName,
      username,
      email,
      id
    }
  }`;

  return request(login_address, b)
  .then(data => {
    return data;
  })
  .catch(error => {
    return Promise.reject(error);
  });
}

function handleResponse(response) {
    return response.text().then(text => {
      console.log(text);
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
  
      return data;
    });
  }

export { loginService, registerService };