import React, { useState, useEffect, useRef, useContext } from "react";
import CarouselMUI from "react-material-ui-carousel";
import { Paper, withStyles, Switch } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSpring, animated } from "react-spring";
import { matchPath } from "react-router-dom";
import { __RouterContext } from "react-router";
import { Waypoint } from "react-waypoint";
import PropTypes from "prop-types";
import ResizeObserver from "resize-observer-polyfill";
export const ProductSliderComp = ({ img, productName }) => {
  return (
    <div className="products">
      <div
        className="image-card"
        style={{
          backgroundImage: `url(${require("../assets/img/slider/" + img)})`,
        }}
      ></div>
      <div className="title-bar">
        <span>{productName}</span>
      </div>
      <div className="card-overlay bg-gradient"></div>
    </div>
  );
};

export const Carousel = ({ arrItem }) => {
  const isRowBased = useMediaQuery("(max-width: 770px)");
  const styles = {
    paper: (matchWidth, props) => ({
      backgroundImage: `url(${require("../assets/img/carousel/" +
        props.item.src)})`,
      height: matchWidth ? "300px" : "100vh",
      width: matchWidth ? "auto" : "100%",
      backgroundSize: "cover",
      border: "0px",
      backgroundPosition: matchWidth ? "center center" : "initial",
      borderRadius: matchWidth ? "15px" : "0px",
      margin: matchWidth ? "0px 20px" : "0",
      zIndex: "2",
    }),
  };

  function Item(props) {
    return (
      <Paper
        style={{
          //   margin: "0px 20px",
          borderRadius: "15px",
          position: "relative",
        }}
      >
        <div className="products" style={styles.paper(isRowBased, props)}></div>
        <div className="card-overlay bg-gradient"></div>
      </Paper>
    );
  }

  return (
    <CarouselMUI
      animation="slide"
      interval={10000}
      navButtonsAlwaysVisible={false}
      className="product-carousel"
    >
      {arrItem.map((item, i) => (
        <Item key={i} item={item} index={i} />
      ))}
    </CarouselMUI>
  );
};

export const Loader = () => {
  return (
    <div className="loader">
      <svg className="circular" viewBox="25 25 50 50">
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export const ThreeDimensionCard = ({ children, className, onClick }) => {
  const ref = useRef();
  const [openProduct, setOpenProduct] = useState(false);
  const [animatedProps, setAnimatedProps] = useSpring(() => ({
    xys: [0, 0, 1],
    opacity: 1,
    config: { mass: 1, tension: 300, friction: 50 },
  }));
  const calc = (x, y) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.1,
  ];
  const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  return (
    <animated.div
      ref={ref}
      className={`card head-category ${className}`}
      onMouseMove={({ clientX: x, clientY: y }) =>
        openProduct ? null : setAnimatedProps({ xys: calc(x, y) })
      }
      onMouseLeave={() =>
        openProduct ? null : setAnimatedProps({ xys: [0, 0, 1] })
      }
      style={{
        transform: animatedProps.xys.interpolate(trans),
        opacity: animatedProps.opacity.interpolate((depth) => depth),
      }}
      onClick={() => {
        setAnimatedProps({
          opacity: 0,
          config: { mass: 1, tension: 300, friction: 30 },
        });
        setOpenProduct(true);
        if (typeof onClick === "function") onClick();
      }}
    >
      {children}
    </animated.div>
  );
};

ThreeDimensionCard.propType = {
  children: PropTypes.element,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export const Waypoints = ({ children, onEnter, bottomOffset }) => {
  return (
    <div>
      <Waypoint onEnter={onEnter} bottomOffset={bottomOffset} />
      {children}
    </div>
  );
};

Waypoints.propType = {
  bottomOffset: PropTypes.string,
  onEnter: PropTypes.func,
  children: PropTypes.element,
};

export function escapeHtml(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/<div><br><\/div>/g, "\n")
    .replace(/<div>/g, "\n")
    .replace(/<\/div>/g, "")
    .replace(/<br>/g, "\n")
    .replace(/&nbsp;/, " ")
    .replace(/<p>/, "")
    .replace(/<\/p>/, "")
    .replace(/<h1>/, "")
    .replace(/<\/h1>/, "");
}

export function useRouter() {
  return useContext(__RouterContext);
}

export function restrictedKey(keyCode) {
  const arrKey = [
    { key: 18, status: false },
    { key: 37, status: false },
    { key: 38, status: false },
    { key: 39, status: false },
    { key: 40, status: false },
    { key: 20, status: false },
    { key: 17, status: false },
    { key: 46, status: false },
    { key: 35, status: false },
    { key: 27, status: false },
    { key: 112, status: false },
    { key: 113, status: false },
    { key: 114, status: false },
    { key: 115, status: false },
    { key: 116, status: false },
    { key: 117, status: false },
    { key: 118, status: false },
    { key: 119, status: false },
    { key: 120, status: false },
    { key: 121, status: false },
    { key: 122, status: false },
    { key: 123, status: false },
    { key: 36, status: false },
    { key: 144, status: false },
    { key: 33, status: false },
    { key: 34, status: false },
    { key: 16, status: false },
    { key: 91, status: false },
  ];

  const res = arrKey.filter((key) => key.key === keyCode);

  return res.length > 0 ? res[0].status : true;
}

export function detectOnBlur(ref, state, setState) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      if (state === true) {
        setState(false);
      }
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
}

export function RippleEffect(e) {
  let x = e.clientX - e.target.offsetLeft;
  let offsetTop = e.target.offsetParent.offsetTop;
  let y = e.clientY - offsetTop;

  let ripples = document.createElement("span");
  ripples.className = "ripple";
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";
  e.target.appendChild(ripples);

  setTimeout(() => {
    ripples.remove();
  }, 1000);
}

export function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ro]);
  return [{ ref }, bounds];
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export const getParams = (path, pathname) => {
  // console.log(path);
  const matchProfile = matchPath(pathname, {
    path: path,
  });
  return (matchProfile && matchProfile.params) || {};
};

export const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    // margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
