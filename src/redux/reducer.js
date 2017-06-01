import { Map, fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import SessionStateReducer, { RESET_STATE } from '../modules/session/SessionState';
import HomeStateReducer from '../modules/home/HomeState';
import SignupStateReducer from '../modules/signup/SignupState';
import LoginStateReducer from '../modules/login/LoginState';


const reducers = {
  // Home States
  homeState: HomeStateReducer,

  // Navigator states
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer,

  // Signup states
  signupState: SignupStateReducer,

  // Login states
  loginState: LoginStateReducer,

};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
