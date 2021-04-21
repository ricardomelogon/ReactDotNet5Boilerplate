import {
  blackColor,
} from "assets/jss/material-dashboard-pro-react.js";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
const extendedFormsStyle = {
  ...customSelectStyle,
  select: {
    ...customSelectStyle.select,
    textTransform: "inherit",
  },
  selectLabel: {
    ...customSelectStyle.selectLabel,
    color: blackColor
  },
  inline: {
    '& .MuiInput-root': {
      marginTop: '0px'
    }
  }
};

export default extendedFormsStyle;
