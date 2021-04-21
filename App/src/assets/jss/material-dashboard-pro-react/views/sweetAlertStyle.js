import { grayColor } from "assets/jss/material-dashboard-pro-react.js";

import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

const sweetAlertStyle = {
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: grayColor[2],
    fontSize: "18px"
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  alertContainer:{
    width: '100%',
    height: '100vh',
    position: 'fixed',
    zIndex: '5000',
    transform: 'scale(1.05)'
  },
  ...buttonStyle
};

export default sweetAlertStyle;
