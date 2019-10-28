import { userConstants } from "../constants/Types";
import { loadAuthReducer } from "../store/LocalStorage";

const initialState = loadAuthReducer();

export function signup(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        signingUp: true,
        user: action.user
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        signedUp: true,
        user: action.user
      };
    case userConstants.REGISTER_FAILURE:
      return {
        signingUp: false,
        signedUp: true
      };
    default:
      return state;
  }
}