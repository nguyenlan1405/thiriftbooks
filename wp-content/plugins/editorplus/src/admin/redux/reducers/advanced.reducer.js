import {
  UPDATE_ADVANCED_SETTINGS,
  SAVED_ADVANCED_SETTINGS,
  SAVING_ADVANCED_SETTINGS,
  SAVE_ADVANCED_SETTINGS,
} from "../actions/types";
const { get } = lodash;

const js = get(
  editor_plus_extension,
  "custom_block_code.extra_setting_values.ep_custom_global_js"
);
const css = get(
  editor_plus_extension,
  "custom_block_code.extra_setting_values.ep_custom_global_css"
);

const staticFileGeneration = get(
  editor_plus_extension,
  "custom_block_code.extra_setting_values.ep_generate_static_file"
);

const initialState = {
  js,
  css,
  loading: false,
  staticFileGeneration,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ADVANCED_SETTINGS:
      return {
        ...state,
        [action.payload.type]: action.payload.value,
      };

    case SAVING_ADVANCED_SETTINGS:
      return {
        ...state,
        loading: true,
      };

    case SAVED_ADVANCED_SETTINGS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
