import LocalizedStrings from 'localized-strings';

let strings = new LocalizedStrings({
  en:{
    register_title:"Register",
    first_name: "First Name",
    last_name: "Last Name",
    username: "Username",
    email:"Email",
    login: "Login",
    password:"Password",
    confirm_password: "Confirm password",
    register:"Register",
    country: "Country",
    city: "City",
    passwords_dont_match: "Passwords don't match"
  },
  es: {
    register_title:"Registrarse",
    first_name: "Nombre",
    last_name: "Apellido",
    username: "Nombre de usuario",
    email:"Email",
    login: "Iniciar Sesión",
    password:"Contraseña",
    confirm_password: "Confirmar contraseña",
    register:"Registrarse",
    country: "País",
    city: "Ciudad",
    passwords_dont_match: "Las contraseñas no coinciden"
  }},
);

export { strings };