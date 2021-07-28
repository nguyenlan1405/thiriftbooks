import { combineReducers } from "redux";
import extensionsReducer from "./extensions.reducer";
import advancedReducer from "./advanced.reducer";

export default combineReducers({
  extensions: extensionsReducer,
  advanced: advancedReducer,
});
