import { UPDATE_ADVANCED_SETTINGS } from "../types";

export const updateAdvancedSettings = (value, type) => (dispatch) => {
  dispatch({
    type: UPDATE_ADVANCED_SETTINGS,
    payload: {
      type,
      value,
    },
  });
};
