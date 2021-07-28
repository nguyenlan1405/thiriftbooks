import {
  TOGGLE_EXTENSION,
  LOADED_EXTENSION,
  LOADING_EXTENSION,
} from "../types";

export const toggleExtension = (name, val) => (dispatch) => {
  const enable_key = `editor_plus_extensions_${name}__enable`;

  const model = new wp.api.models.Settings({
    [enable_key]: val,
  });

  dispatch({
    type: LOADING_EXTENSION,
    payload: {
      name,
    },
  });

  model.save().then((response) => {
    dispatch({
      type: LOADED_EXTENSION,
    });

    dispatch({
      type: TOGGLE_EXTENSION,
      payload: {
        name,
        value: val,
      },
    });
  });
};
