import { userConstants } from "../constants/Types";
import { alertActions } from "./AlertActions";
import { statement } from "@babel/template";

function login(state, user, error) {
  return dispatch => {
    
    if(state){
      dispatch(success(user));
    }
    else{
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };

  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function login_request(user){
  return dispatch => {
    return dispatch({ type: userConstants.LOGIN_REQUEST, user });
  }
}

function register(state, user, error) {

  return dispatch => {
    
    if(state){
      dispatch(success(user));
    }
    else{
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };

  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function register_request(user){
  return dispatch => {
    return dispatch({ type: userConstants.REGISTER_REQUEST, user });
  }
}

export const userActions = {
    login,
    login_request,
    register,
    register_request
};