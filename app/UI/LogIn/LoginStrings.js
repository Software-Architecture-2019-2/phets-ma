import LocalizedStrings from 'localized-strings';

let strings = new LocalizedStrings({
  en:{
    name: "PHETS",
    tagline:"A new world",
    username:"Username",
    invalid: "Invalid username or password", 
    login: "Login",
    password:"Password",
    register:"Register",
    fill_all: "You must fill all fields",
    text: "Enter your credentials"
  },
  es: {
    name: "PHETS",
    tagline:"Un nuevo mundo",
    username:"Username",
    invalid: "Usuario o contraseña invalido",
    login: "Iniciar Sesión",
    password:"Contraseña",
    register:"Registrarse",
    fill_all: "Debe llenar todos los campos",
    text: "Ingrese sus credenciales"
  }},
);

export { strings };