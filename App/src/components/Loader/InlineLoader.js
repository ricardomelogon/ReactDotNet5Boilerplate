import React from "react";

import CircularProgress from '@material-ui/core/CircularProgress';
import Section from "../../components/Section/Section";

export default function Loader(props) {
  const {
    size,
  } = props;
  return (
    <Section dFlex justifyContentCenter alignItemsCenter my5 py5>
        <CircularProgress color="inherit" size={`${size ? size : 5}rem`} />
    </Section>
  );
}
