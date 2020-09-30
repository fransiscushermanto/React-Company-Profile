import React, { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";

import { animated, useTransition } from "react-spring";

import { detectOnBlur } from "../../Factories";
import FacebookIcon from "../../../assets/img/icon/DqFxD4xdyNS.png";
const TopNav = ({ user, logout }) => {
  const dropdownRef = useRef();

  const [active, setActive] = useState(false);
  const [dropdownList] = useState([
    { title: "Log Out", icon: FacebookIcon, onClick: logout },
  ]);

  const transition = useTransition(active, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, pointerEvents: "none" },
  });

  useEffect(() => {
    detectOnBlur(dropdownRef, active, setActive);
  }, [active, dropdownRef]);

  return (
    <div className="top_nav">
      <div className="top_nav_wrapper">
        <div className="right__top_nav">
          <div className="inner-right__top_nav">
            <div className="logo_brand">
              <Avatar
                round={"50%"}
                size={"40px"}
                style={{ backgroundColor: "black", cursor: "pointer" }}
                src={require("../../../assets/img/5s.png")}
              />
            </div>
          </div>
        </div>
        <div className="left__top_nav">
          <div className="inner-left__top_nav">
            <div className="user_display_name">
              <button className="btn">
                <span>{user.data.name}</span>
              </button>
            </div>
            <div className="toggle_nav_btn" ref={dropdownRef}>
              <button
                className={`btn ${active && "active"}`}
                onClick={() => setActive(!active)}
              >
                <i className="icon-display">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-down"
                    className="svg-inline--fa fa-caret-down fa-w-10"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                    ></path>
                  </svg>
                </i>
              </button>
              {transition.map(
                ({ item, key, props: animation }) =>
                  item && (
                    <Dropdown
                      key={key}
                      animation={animation}
                      dropdownList={dropdownList}
                      active={item}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({ animation, dropdownList }) => {
  return (
    <animated.div style={animation} className="dropdown__nav">
      <div className="inner_dropdown__nav">
        {dropdownList.map((nav_item, index) => (
          <div
            key={index}
            className="dropdown__nav-item"
            onClick={nav_item.onClick}
          >
            <div className="inner_dropdown__nav-item">
              <div className="icon-place">
                <i
                  className="dropdown__nav-icon-display"
                  style={{
                    backgroundImage: `url(${nav_item.icon})`,
                    backgroundPosition: "0px -1058px",
                  }}
                ></i>
              </div>
              <div className="item-tag">
                <span>{nav_item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </animated.div>
  );
};

export default TopNav;
