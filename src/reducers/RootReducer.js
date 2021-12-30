import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
import { ProjectReducer } from "./ProjectReducer";

// import { reducer2 } from "./reducer2";
const RootReducer = combineReducers({
  AuthReducer,
  ProjectReducer
//   reducer2
});
export default RootReducer;