import { grayColor } from "assets/jss/material-dashboard-pro-react.js";

const modalStyle = theme => ({
  modalRoot: {
    overflow: "auto",
    alignItems: "unset",
    justifyContent: "unset"
  },
  modal: {
    [theme.breakpoints.up("sm")]: {
      margin: "auto"
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%"
    },
    borderRadius: "6px",
    marginTop: "100px !important",
    overflow: "visible",
    maxHeight: "unset",
    position: "relative",
    height: "fit-content"
  },
  sm: {
    [theme.breakpoints.up("sm")]: {
      width: "320px",
      maxWidth: "unset !important"
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
      maxWidth: "unset !important"
    },
    [theme.breakpoints.up("lg")]: {
      width: "500px",
      maxWidth: "unset !important"
    },
  },
  md: {
    [theme.breakpoints.up("sm")]: {
      width: "450px",
      maxWidth: "unset !important"
    },
    [theme.breakpoints.up("md")]: {
      width: "600px",
      maxWidth: "unset !important"
    },
    [theme.breakpoints.up("lg")]: {
      width: "800px",
      maxWidth: "unset !important"
    },
  },
  lg: {
    [theme.breakpoints.up("sm")]: {
      width: "600px",
      maxWidth: "unset !important"
    },
    [theme.breakpoints.up("md")]: {
      width: "800px",
      maxWidth: "unset !important"
    },
    [theme.breakpoints.up("lg")]: {
      width: "1000px",
      maxWidth: "unset !important"
    },
  },
  full: {
    width: "100%",
    maxWidth: "unset !important"
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px"
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143"
  },
  modalCloseButton: {
    color: grayColor[0],
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right"
  },
  modalClose: {
    width: "16px",
    height: "16px"
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    overflow: "visible"
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0"
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  instructionNoticeModal: {
    marginBottom: "25px"
  },
  imageNoticeModal: {
    maxWidth: "150px"
  },
  modalSmall: {
    width: "300px"
  },
  modalSmallBody: {
    paddingTop: "0"
  },
  modalSmallFooterFirstButton: {
    margin: "0",
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "auto"
  },
  modalSmallFooterSecondButton: {
    marginBottom: "0",
    marginLeft: "5px"
  },
  modalScroll: {
    overflow: 'auto'
  },
});

export default modalStyle;
