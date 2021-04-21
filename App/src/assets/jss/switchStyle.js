import {
  primaryColor,
  grayColor,
  blackColor,
  whiteColor,
  hexToRgb,
} from "../../assets/jss/material-dashboard-pro-react.js";

const switchStyle = {
  switchBase: {
    color: primaryColor[0] + "!important",
    '&$switchChecked:hover': {
      backgroundColor: `rgba(${hexToRgb(primaryColor[0])}, 0.1)`
    }
  },
  switchIcon: {
    boxShadow: "0 1px 3px 1px rgba(" + hexToRgb(blackColor) + ", 0.4)",
    color: whiteColor + " !important",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)"
  },
  switchIconChecked: {
    borderColor: primaryColor[0],
    transform: "translateX(0px)!important"
  },
  switchBar: {
    width: "30px",
    height: "15px",
    backgroundColor: "rgb(" + hexToRgb(grayColor[18]) + ")",
    borderRadius: "15px",
    opacity: "0.7!important"
  },
  switchChecked: {
    "& + $switchBar": {
      backgroundColor: "rgba(" + hexToRgb(primaryColor[0]) + ", 1) !important"
    },
    "& $switchIcon": {
      borderColor: primaryColor[0]
    }
  }
};

export default switchStyle;
