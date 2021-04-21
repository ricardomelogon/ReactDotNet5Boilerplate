import {
  defaultFont,
  container,
  containerFluid,
  whiteColor,
  blackColor
} from "assets/jss/material-dashboard-pro-react.js";

const footerStyle = {
  block: {},
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    margin: "0",
    fontSize: "14px",
    float: "right!important",
    padding: "15px",
    color: whiteColor,
  },
  footer: {
    bottom: "0",
    padding: "15px 0",
    ...defaultFont,
    zIndex: 4
  },
  container: {
    zIndex: 3,
    ...container,
    position: "relative"
  },
  containerFluid: {
    zIndex: 3,
    ...containerFluid,
    position: "relative"
  },
  a: {
    color: whiteColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0",
    width: "auto"
  },
  whiteColor: {
    "&,&:hover,&:focus": {
      color: whiteColor
    }
  },
  blackColor:{
    color: blackColor
  }
};
export default footerStyle;
