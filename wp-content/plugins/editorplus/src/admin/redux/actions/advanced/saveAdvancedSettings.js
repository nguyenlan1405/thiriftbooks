import { SAVING_ADVANCED_SETTINGS, SAVED_ADVANCED_SETTINGS } from "../types";
const { isEqual, get } = window.lodash;

import store from "../../store/store";

const savedCSS = get(
  editor_plus_extension,
  "custom_block_code.extra_setting_values.ep_custom_global_css"
);

export const saveAdvancedSettings = () => (dispatch) => {
  const {
    advanced: { css, js, staticFileGeneration },
  } = store.getState(); // getting the code

  dispatch({
    type: SAVING_ADVANCED_SETTINGS,
  }); // dispatching loading state

  const updatedOptions = {
    ep_custom_global_js: encodeURIComponent(window.btoa(js)),
    ep_custom_global_css: css,
    ep_generate_static_file: new String(staticFileGeneration),
  };

  if (!isEqual(savedCSS, css)) {
    updatedOptions["ep_custom_global_css_version"] =
      "latest-" + Math.floor(Math.random() * 1000);
  }

  const model = new wp.api.models.Settings(updatedOptions); // creating a settings model

  // saving the updated settings then getting the response
  model.save().then((response) => {
    dispatch({
      type: SAVED_ADVANCED_SETTINGS,
    }); // dispatching the loading finished state
  });
};
