/**
 * All editor plus feature will be included here...
 */

import StylingControls from "./styling-controls/index";
import RenderStyles, {
  RenderSavedStyles,
} from "./styling-controls/components/render-style";
import RenderMultiStyles from "./styling-controls/components/mergeGroupStyles";
import SwitchSidebar from "./styling-controls/components/switch-sidebar";
import CustomInspector from "./styling-controls/components/custom-inspector";
import { toggleSidebar } from "./styling-controls/utils.js";
import ButtonGroup from "../components/styling-controls/buttonGroup";
import IconPicker from "../components/icon-picker/index";

export const editorPlusData = {
  components: {
    StylingControls,
    RenderStyles,
    RenderSavedStyles,
    RenderMultiStyles,
    SwitchSidebar,
    InspectorControls: CustomInspector,
    ButtonGroup,
    IconPicker,
  },
  actions: {
    toggleSidebar,
  },
};

window.editorPlus = editorPlusData;
