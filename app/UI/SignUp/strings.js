import LocalizedStrings from 'localized-strings';

let strings = new LocalizedStrings({
  en:{
    register_title:"Register",
    name: "Name",
    username: "Username",
    email:"Email",
    login: "Login",
    password:"Password",
    confirm_password: "Confirm password",
    register:"Register",
    country: "Country",
    city: "City"
  },
  es: {
    register_title:"Registrarse",
    name: "Nombre",
    username: "Nombre de usuario",
    email:"Email",
    login: "Iniciar Sesión",
    password:"Contraseña",
    confirm_password: "Confirmar contraseña",
    register:"Registrarse",
    country: "País",
    city: "Ciudad"
  }},
);

export { strings };