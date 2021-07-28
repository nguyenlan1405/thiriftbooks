import Dimensions, {
  dimensionSchema,
  convertDimensions,
  convertDimensionsToSchema,
} from "../../../components/styling-controls/dimensions/index";
import Sizing, {
  convertSizing,
  sizingSchema,
  convertSizingToSchema,
} from "../../../components/styling-controls/sizing";
import OtherSettings, {
  otherSettingsSchema,
  convertOtherSettings,
  convertOtherSettingsToSchema,
} from "../../../components/styling-controls/other/index";
import {
  Border,
  bordersSchema,
  convertBorders,
  convertBordersToSchema,
} from "../../../components/styling-controls/border/border";
import {
  Shadow,
  shadowSchema,
  convertShadow,
  convertShadowToSchema,
} from "../../../components/styling-controls/shadow";
import {
  Background,
  backgroundSchema,
  convertBackground,
  convertBackgroundToSchema,
} from "../../../components/styling-controls/background/index";
import ShapeDivider, {
  convertShapeDivider,
  ShapeDividerSchema,
} from "../../../components/styling-controls/shape-divider";
import Typography, {
  convertTypography,
  typographySchema,
  convertTypographyToSchema,
} from "../../../components/styling-controls/typography";
import {
  Range,
  RangeSchema,
  convertRange,
  convertRangeToSchema,
} from "../../../components/styling-controls/range/range";
import ColorPicker, {
  colorSchema,
  convertColor,
  convertColorToSchema,
} from "../../../components/styling-controls/color-picker/index";
import ButtonGroup, {
  buttonGroupSchema,
  convertButtonGroup,
} from "../../../components/styling-controls/button-group/index";
import IconPicker, {
  IconPickerSchema,
  IconPickerConverter,
  convertIconToSchema,
} from "../../../components/styling-controls/icon-picker/index";

export const epControls = {
  Dimensions: {
    component: Dimensions,
    schema: dimensionSchema,
    canAcceptLabel: true,
    convert: convertDimensions,
    convertToSchema: convertDimensionsToSchema,
    isObject: true,
  },
  Sizing: {
    component: Sizing,
    schema: sizingSchema,
    canAcceptLabel: false,
    convert: convertSizing,
    convertToSchema: convertSizingToSchema,
    isObject: true,
  },
  OtherSettings: {
    component: OtherSettings,
    schema: otherSettingsSchema,
    canAcceptLabel: false,
    convert: convertOtherSettings,
    convertToSchema: convertOtherSettingsToSchema,
    isObject: true,
  },
  Border: {
    component: Border,
    schema: bordersSchema,
    canAcceptLabel: true,
    convert: convertBorders,
    convertToSchema: convertBordersToSchema,
    isObject: true,
  },
  Shadow: {
    component: Shadow,
    schema: shadowSchema,
    canAcceptLabel: true,
    convert: convertShadow,
    convertToSchema: convertShadowToSchema,
    isObject: false,
  },
  Background: {
    component: Background,
    schema: backgroundSchema,
    canAcceptLabel: true,
    convert: convertBackground,
    convertToSchema: convertBackgroundToSchema,
    isObject: true,
  },
  ShapeDivider: {
    component: ShapeDivider,
    schema: ShapeDividerSchema,
    canAcceptLabel: false,
    convert: convertShapeDivider,
    convertToSchema: (v) => v,
    isObject: false,
  },
  Typography: {
    component: Typography,
    schema: typographySchema,
    canAcceptLabel: false,
    convert: convertTypography,
    convertToSchema: convertTypographyToSchema,
    isObject: true,
  },
  Range: {
    component: Range,
    schema: RangeSchema,
    canAcceptLabel: true,
    convert: convertRange,
    convertToSchema: convertRangeToSchema,
    isObject: false,
  },
  ColorPicker: {
    component: ColorPicker,
    schema: colorSchema,
    convert: convertColor,
    isObject: false,
    canAcceptLabel: true,
    convertToSchema: convertColorToSchema,
  },
  ButtonGroup: {
    component: ButtonGroup,
    schema: buttonGroupSchema,
    convert: convertButtonGroup,
    isObject: false,
    canAcceptLabel: true,
    convertToSchema: (v) => v,
  },
  IconPicker: {
    component: IconPicker,
    schema: IconPickerSchema,
    convert: IconPickerConverter,
    isObject: true,
    convertToSchema: convertIconToSchema,
    canAcceptLabel: true,
  },
};
