import { combineReducers } from 'redux';
import { login } from "../reducers/LoginReducer";

const rootReducer = combineReducers({ login });

export default rootReducer;