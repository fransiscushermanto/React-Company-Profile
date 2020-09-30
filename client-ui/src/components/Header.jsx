import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Avatar from "react-avatar";

import { detectOnBlur, RippleEffect } from "./Factories";
import "../sass/header.scss";

const Nav = ({ navItem, setShowNav, showNav, setLoading }) => {
  const history = useHistory();

  const navRef = useRef(null);
  const expand = useTransition(showNav, null, {
    from: { left: "-20%", opacity: "0" },
    enter: {
      zIndex: 1500,
      left: "0%",
      opacity: "1",
    },
    leave: { left: "-20%", opacity: "0" },
    config: { mass: 1, tension: 210, friction: 20 },
  });

  useEffect(() => {
    detectOnBlur(navRef, showNav, setShowNav);
  }, [showNav, navRef, setShowNav]);

  return expand.map(
    ({ item, props, key }) =>
      item && (
        <div className="nav-wrapper" key={key}>
          <animated.div
            className="navigation"
            key={key}
            style={props}
            ref={navRef}
          >
            <ul>
              <span className="toggle" onClick={() => setShowNav(false)}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-x"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                  />
                </svg>
              </span>
              {navItem.map((item, index) => (
                <li key={index}>
                  <Link
                    to={{ pathname: item.href }}
                    onClick={(e) => {
                      RippleEffect(e);
                      setShowNav(false);
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                      }, 1000);
                    }}
                    className={
                      history.location.pathname.split("/")[1] ===
                      item.href.split("/")[1]
                        ? "active"
                        : ""
                    }
                  >
                    <span className="title">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </animated.div>
        </div>
      )
  );
};

const PageHeader = ({ setLoading }) => {
  const [navItem] = useState([
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/product",
      title: "Product MCI",
    },
    {
      href: "#",
      title: "Paket MCI",
    },
    { href: "#", title: "About me" },
  ]);
  const [showNav, setShowNav] = useState(false);
  return (
    <header
      className="page-header"
      style={{ zIndex: showNav ? "1500" : "1000" }}
    >
      <Nav
        setShowNav={setShowNav}
        showNav={showNav}
        navItem={navItem}
        setLoading={setLoading}
      />

      <div
        className="toggle"
        onClick={() => setShowNav(showNav ? false : true)}
      ></div>

      <Link to="/" className="ml-auto">
        <Avatar
          round={"40px"}
          size={"40px"}
          className="profile-avatar"
          maxInitials={2}
          src={require("../assets/img/5s.png")}
        />
      </Link>
    </header>
  );
};

export default PageHeader;
