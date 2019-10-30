import { combineReducers } from 'redux';
import { login } from "../reducers/LoginReducer";
import { signup } from "../reducers/SignUpReducer";
import { setDefaultPet, setPhetsList } from "../reducers/PhetsReducer";

const rootReducer = combineReducers({ login, signup, setDefaultPet, setPhetsList });

export default rootReducer;