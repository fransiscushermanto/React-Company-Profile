import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { Skeleton } from "@material-ui/lab";

import { useFirebase } from "../../../firebase/FirebaseContext";
import { useMeasure, usePrevious, getParams } from "../../Factories";
import { useCallback } from "react";

const TreeNav = ({ item, NavRenderer, setNavItemActive }) => {
  const [open, setOpen] = useState(false);
  const previous = usePrevious(open);
  const ref = useRef();
  const [bind, { height: viewHeight }] = useMeasure();

  const { height, opacity, transform, pointerEvents } = useSpring({
    from: {
      pointerEvents: "none",
      height: 0,
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      pointerEvents: open ? "all" : "none",
      height: open ? viewHeight : 0,
      opacity: open ? 1 : 0,
      transform: `translate3d(${open ? 0 : 20}px,0,0)`,
    },
  });

  useEffect(() => {
    if (item.child.find((childNav) => childNav.active === true)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [item.active, item.child]);
  return (
    <div ref={ref}>
      <span
        className={`btn ${(open && "active") || (item.active && "active")}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="inner-side_nav_item">
          <i className="icon-display">
            <img src={item.icon} alt="icon" />
          </i>
          <span>{item.name}</span>
          <button className="btn">
            <i className="icon-down">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angle-down"
                className="svg-inline--fa fa-angle-down fa-w-10"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                style={{ transform: `rotate(${open ? -180 : 0}deg)` }}
              >
                <path
                  fill="currentColor"
                  d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                ></path>
              </svg>
            </i>
          </button>
        </div>
      </span>
      <animated.div
        style={{
          opacity,
          height: open && previous === open ? "auto" : height,
        }}
        className="child-nav-item"
      >
        <animated.div style={{ transform, pointerEvents }} {...bind}>
          <ul>
            {item.child.map((innerItem, index) => (
              <li key={index}>{NavRenderer(innerItem)}</li>
            ))}
          </ul>
        </animated.div>
      </animated.div>
    </div>
  );
};

const SideNav = () => {
  const [navigation, setNavigation] = useState([]);
  const firebase = useFirebase();
  const { url } = useRouteMatch();
  const firsLoad = useRef(true);
  const history = useHistory();
  const { pathname } = history.location;
  const parentParams = getParams(
    `\/${url.split("/")[1]}/\:parent_nav`,
    pathname
  );
  const childparams = getParams(
    `\/${url.split("/")[1]}/${pathname.split("/")[2]}/\:child_nav`,
    pathname
  );
  const user = useSelector((state) => state.auth.user);

  const formattingNavFromDatabase = (item, arr = [], nav_id = "") => {
    if (item.child) {
      arr[arr.length] = {
        nav_id: nav_id,
        name: item.name,
        icon: item.icon,
        child: [],
        active: false,
        type: item.type,
      };
      user.data.access.map((userAccess) => {
        if (userAccess.status) {
          if (userAccess.type === item.type) {
            item.child.map((childItem) => {
              const childAccess = userAccess.child.find(
                (access) => access.type === childItem.type
              );
              if (childAccess?.status) {
                const data = item.child.find(
                  (child) => child.type === childAccess.type
                );
                data["active"] = false;
                data["parent_index"] = arr.length - 1;
                arr[arr.length - 1].child.push(data);
                if (childItem.child) {
                  formattingNavFromDatabase(
                    childItem,
                    arr[arr.length - 1].child
                  );
                }
              }
            });
          }
        }
      });
      if (arr[arr.length - 1].child.length < 1) {
        arr.splice(arr.length - 1, 1);
      }
    } else {
      user.data.access.map((userAccess) => {
        if (userAccess.status) {
          if (item.type === userAccess.type) {
            item["active"] = false;
            item["nav_id"] = nav_id;
            arr.push(item);
          }
        }
      });
    }
  };

  const NavRenderer = (item) => {
    if (item.child) {
      return (
        <div className="side_nav_item">
          <TreeNav
            item={item}
            setNavItemActive={setNavItemActive}
            NavRenderer={NavRenderer}
          />
        </div>
      );
    } else {
      return (
        <div className="side_nav_item">
          <Link
            className={`btn ${item.active && "active"}`}
            onClick={() => {
              setNavItemActive(item, item.parent_index);
            }}
            to={`${url}/${item.href}`}
          >
            <div className="inner-side_nav_item">
              <i className="icon-display">
                <img src={item.icon} alt="icon" />
              </i>
              <span>{item.name}</span>
            </div>
          </Link>
        </div>
      );
    }
  };

  const setNavItemActive = (item, parent_index) => {
    let index, indexChild;
    const temp = [...navigation];

    const childRecursive = (navItem) => {
      if (navItem.active) {
        navItem.active = false;
        if (navItem.child) {
          navItem.child.map((navItemChild) => {
            childRecursive(navItemChild);
          });
        }
      }
    };

    temp.map((navItem) => {
      childRecursive(navItem);
    });

    if (parent_index !== undefined) {
      const tempParent = { ...temp[parent_index] };
      tempParent.active = true;
      const tempChild = [...tempParent.child];
      indexChild = tempChild.indexOf(item);
      tempChild[indexChild].active = true;
      tempParent.child = tempChild;
      temp[parent_index] = tempParent;
    } else {
      index = temp.indexOf(item);
      temp[index].active = true;
    }

    setNavigation(temp);
  };

  // useEffect(() => {
  //   console.log(navigation);
  // }, [navigation]);
  const updateActiveNavOnMounted = useCallback(
    (parentParams = "", childParams = "") => {
      navigation.map((navItem, index) => {
        if (navItem.type === parentParams) {
          if (navItem.child) {
            navItem.child.map((childNavItem) => {
              if (childNavItem.type.split("_")[1] === childParams) {
                setNavItemActive(childNavItem, index);
              }
            });
          } else {
            setNavItemActive(navItem);
          }
        }
      });
    },
    [navigation]
  );

  useEffect(() => {
    if (firsLoad.current && navigation.length) {
      // console.log(url.split("/"), childparams, parentParams, pathname);
      updateActiveNavOnMounted(
        parentParams?.parent_nav,
        childparams?.child_nav
      );
      firsLoad.current = false;
    }
  }, [updateActiveNavOnMounted]);

  useEffect(() => {
    firebase.firestore.collection("navigation").onSnapshot((res) => {
      const navArr = [];
      res.docs.map((navItem) => {
        formattingNavFromDatabase(navItem.data(), navArr, navItem.id);
      });
      setNavigation(navArr);
    });
  }, [firebase, user]);

  return (
    <div className="side_nav">
      <div className="side_nav_wrapper">
        <ul>
          {navigation.length > 0
            ? navigation.map((navItem, index) => {
                return <li key={index}>{NavRenderer(navItem, index)}</li>;
              })
            : [1, 2, 3].map((item) => (
                <li key={item}>
                  <div className="side_nav_item">
                    <div className="btn">
                      <div className="inner-side_nav_item">
                        <Skeleton
                          variant="circle"
                          width={45}
                          height={36}
                          style={{ margin: "8px 0px", marginRight: "12px" }}
                        />
                        <Skeleton variant="text" width={"100%"} height={25} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
