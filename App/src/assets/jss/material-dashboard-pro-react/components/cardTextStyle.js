import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayColor,
  whiteColor
} from "assets/jss/material-dashboard-pro-react.js";

const cardTextStyle = {
  cardText: {
    float: "none",
    display: "inline-block",
    marginRight: "0",
    borderRadius: "3px",
    backgroundColor: grayColor[0],
    padding: "15px",
    marginTop: "-20px",
    '& h1, h2, h3, h4, h5, h6':{
      color: whiteColor
    }
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
};

export default cardTextStyle;
