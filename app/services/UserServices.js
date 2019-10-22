import { login_address, countries } from "./address";

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
  
    return fetch(login_address, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response);
            return response;
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

export { loginService };