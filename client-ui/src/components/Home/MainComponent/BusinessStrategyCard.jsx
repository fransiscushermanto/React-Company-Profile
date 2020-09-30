import React, { useState } from "react";
import PropTypes from "prop-types";
import { animated, useTransition, useSpring } from "react-spring";

import { Waypoints } from "../../Factories";

const BusinessStrategyCard = ({ cards }) => {
  const [showCard, setShowCard] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const spring = useSpring({
    opacity: showTitle ? 1 : 0,
  });
  const transition = useTransition(
    showCard ? cards : [],
    (card) => card.title,
    {
      trail: 400 / cards.length,
      from: { opacity: 0, transform: "scale(0)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0)" },
    }
  );
  return (
    <Waypoints
      onEnter={() => (!showTitle ? setShowTitle(true) : null)}
      bottomOffset="0%"
    >
      <div className="business-strategy-card">
        <div className="card">
          <animated.div style={spring} className="card-title">
            <h5>Mengapa Harus Join MCI Sekarang?</h5>
            <p>Jawabannya adalah 4P. Apa itu 4P?</p>
          </animated.div>
          <Waypoints
            onEnter={() => (!showCard ? setShowCard(true) : null)}
            bottomOffset="0"
          >
            <div className="card-body">
              {transition.map(({ item, key, props: animation }, index) => (
                <animated.div
                  key={index}
                  className="card strategy-card"
                  style={animation}
                >
                  <div className="card-body">
                    <span className="icon-place">{item.icon}</span>
                    <span className="title">{item.title}</span>
                    <span className="description">{item.description}</span>
                  </div>
                </animated.div>
              ))}
            </div>
          </Waypoints>
        </div>
      </div>
    </Waypoints>
  );
};

BusinessStrategyCard.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default BusinessStrategyCard;
