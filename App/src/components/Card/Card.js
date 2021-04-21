import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "assets/jss/material-dashboard-pro-react/components/cardStyle.js";

const useStyles = makeStyles(styles);

/**
 * 
 * @param {*} animate has animation 
 * @param {*} fade animation fade, only works if animation has been selected
 * @param {*} color primary | info | success | warning | danger | rose
 */
export default function Card(props) {
  const classes = useStyles();
  const {
    className,
    children,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color,
    product,
    testimonial,
    chart,
    login,
    animate,
    fade,
    shrink,
    ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    [classes.cardBackground]: background,
    [classes.cardPricingColor]:
      (pricing && color !== undefined) || (pricing && background !== undefined),
    [classes[color]]: color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
    [classes.cardChart]: chart,
    [classes.cardLogin]: login,
    [classes.cardAnimate]: animate,
    [classes.cardShrink]: shrink,
    [className]: className !== undefined
  });

  const [cardAnimaton, setCardAnimation] = React.useState(animate ? (fade ? classes.cardAnimatingFade : classes.cardAnimating) : "");
  React.useEffect(() => {
    if (animate) {
      let id = setTimeout(function () {
        setCardAnimation("");
      }, 700);
      // Specify how to clean up after this effect:
      return function cleanup() {
        window.clearTimeout(id);
      };
    }
  });

  return (
    <div className={`${cardClasses} ${cardAnimaton}`} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  blog: PropTypes.bool,
  raised: PropTypes.bool,
  background: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  product: PropTypes.bool,
  chart: PropTypes.bool,
  login: PropTypes.bool,
  children: PropTypes.node
};
