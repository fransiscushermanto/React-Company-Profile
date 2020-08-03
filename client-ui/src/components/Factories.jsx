import React, { useState, useEffect } from "react";
import CarouselMUI from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

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
    >
      {arrItem.map((item, i) => (
        <Item key={i} item={item} index={i} />
      ))}
    </CarouselMUI>
  );
};

export const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);
  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeEventListener(handler);
  }, []);
  return matches;
};
