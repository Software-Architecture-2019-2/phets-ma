import LocalizedStrings from 'localized-strings';

let strings = new LocalizedStrings({
  en:{
    login_title:"Login to Phets",
    username:"username",
    login: "Login",
    password:"password",
    register:"Register",
    fill_all: "You must fill all fields",
  },
  es: {
    login_title:"Iniciar Sesión en Phets",
    username:"username",
    login: "Iniciar Sesión",
    password:"contraseña",
    register:"Registrarse",
    fill_all: "Debe llenar todos los campos",
  }},
);

export { strings };