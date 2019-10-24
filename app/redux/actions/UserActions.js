import { userConstants } from "../constants/Types";
import { loginService } from "../../services/UserServices";
import { alertActions } from "./AlertActions";

function login(username, password) {
    return dispatch => {
      dispatch(request({ username }));
  
      loginService({username, password}).then(
        response => {
            console.log(response);
            const user = {
                token: response
            };
            dispatch(success(user));
            // TODO here you can force a page load
        },
        error => {
            console.log("ERROR: " + error);
            // TODO here you can force a page load
            dispatch(failure(error));
            dispatch(alertActions.error(error));
        }
      );
    };
  
    function request(user) {
      return { type: userConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
      return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConstants.LOGIN_FAILURE, error };
    }
}

function register(user) {
    return dispatch => {
      dispatch(request(user));
  
      userService.register(user).then(
        user => {
            dispatch(success());
            dispatch(alertActions.success("Registration successful"));
            // TODO here you can force a page load
        },
        error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
        }
      );
    };
  
    function request(user) {
      return { type: userConstants.REGISTER_REQUEST, user };
    }
    function success(user) {
      return { type: userConstants.REGISTER_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConstants.REGISTER_FAILURE, error };
    }
}

export const userActions = {
    login,
    register
};