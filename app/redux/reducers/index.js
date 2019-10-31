import { combineReducers } from 'redux';
import { login } from "../reducers/LoginReducer";
import { signup } from "../reducers/SignUpReducer";
import { setDefaultPhet, setPhetsList } from "../reducers/PhetsReducer";

const rootReducer = combineReducers({ login, signup, setDefaultPhet, setPhetsList });

export default rootReducer;