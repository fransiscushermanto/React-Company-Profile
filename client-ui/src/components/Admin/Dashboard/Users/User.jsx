import React, { useState, useEffect, useRef } from "react";
import Avatar from "react-avatar";
import { animated, useTransition, useSpring } from "react-spring";
import { useForm } from "react-hook-form";
import { Edit } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import { IOSSwitch, detectOnBlur, useMeasure } from "../../../Factories";
import { useFirebase } from "../../../../firebase/FirebaseContext";

const DropdownAccessWrapperComponent = ({
  access,
  renderAccessTree,
  updateAccess,
  parentIndex,
  setSave,
}) => {
  const [open, setOpen] = useState(false);

  const [bind, { height: viewHeight }] = useMeasure();

  const { padding, height, opacity, pointerEvents } = useSpring({
    from: {
      pointerEvents: "none",
      height: 0,
      opacity: 0,
      padding: "0 0",
    },
    to: {
      pointerEvents: open ? "all" : "none",
      height: open ? viewHeight + 10 : 0,
      opacity: open ? 1 : 0,
      padding: open ? "5px 0px" : "0 0px",
    },
  });

  const labelChild = [];
  access.child.map((childAccess) => {
    labelChild.push(
      childAccess.type.split("_")[1].charAt(0).toUpperCase() +
        childAccess.type.split("_")[1].slice(1)
    );
  });

  return (
    <div className="access-wrapper with-child">
      <div className="inner-access-wrapper">
        <div className="top-with-child" onClick={() => setOpen(!open)}>
          <div className="label-child">
            <span>
              {access.type.charAt(0).toUpperCase() + access.type.slice(1)}
            </span>
            <p>{labelChild.join(", ")}</p>
          </div>
          <div className="btn-down">
            <span style={{ transform: open && "rotate(-180deg)" }}>
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
            </span>
          </div>
        </div>

        <animated.div
          className="child"
          style={{
            opacity,
            padding,
            height,
          }}
        >
          <animated.div style={{ pointerEvents }} {...bind}>
            <div className="action-parent">
              <div className="text">
                <span>Disable all</span>
              </div>
              <span
                className="switch"
                onClick={() => {
                  updateAccess(access);
                  setSave(true);
                }}
              >
                <IOSSwitch checked={access.status} name={access.type} />
              </span>
            </div>
            <ul>
              {access.child.map((childAccess, i) => {
                return renderAccessTree(childAccess, i, parentIndex);
              })}
            </ul>
          </animated.div>
        </animated.div>
      </div>
    </div>
  );
};

const UserSkeleton = () => {
  return (
    <form>
      <div className="inner-user-wrapper">
        <div className="upper-user">
          <div className="inner-upper-user">
            <div className="left">
              <Skeleton
                variant="rect"
                style={{ borderRadius: "30%" }}
                width={40}
                height={40}
              />
            </div>

            <div className="right">
              <Skeleton variant={"text"} />
              <Skeleton variant={"text"} />
            </div>
          </div>
        </div>
        <div className="lower-user">
          <div className="inner-lower-user">
            <ul>
              {[1, 2, 3].map((item) => (
                <li>
                  <div
                    className="access-wrapper"
                    style={{ pointerEvents: "none" }}
                  >
                    <div className="inner-access-wrapper">
                      <Skeleton
                        variant={"text"}
                        width={"80%"}
                        style={{ borderRadius: "10px" }}
                      />
                      <Skeleton
                        variant={"rect"}
                        width={42}
                        height={26}
                        style={{ borderRadius: "30px", marginLeft: "auto" }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="action-btn-wrapper">
              <div className="left">
                <Skeleton
                  className="btn"
                  variant={"rect"}
                  width={42}
                  height={26}
                  style={{ borderRadius: "30px" }}
                />
              </div>
              <div className="right">
                <Skeleton
                  className="btn"
                  variant={"rect"}
                  width={82.9}
                  height={38}
                />
                <Skeleton
                  className="btn"
                  variant={"rect"}
                  width={65.1}
                  height={38}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const UserForm = ({ user, levels }) => {
  const inputRef = useRef(null);
  const displayNameRef = useRef(null);
  const [save, setSave] = useState(false);
  const [editName, setEditName] = useState(false);
  const [userState, setUserState] = useState(user);
  const [access, setAccess] = useState(user?.data.access);
  const [username, setUsername] = useState(user?.data.name);
  const [disabled, setDisabled] = useState(user?.data.disabled);
  const [selectedLevel, setSelectedLevel] = useState(
    user &&
      levels.find((level) => level.level_id === user.data.level.level_id)
        .level_id
  );

  const firebase = useFirebase();
  const { handleSubmit } = useForm();

  const colors = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];

  const renderAccessTree = (access, index, parentIndex) => {
    if (access.child) {
      const labelChild = [];
      access.child.map((childAccess) => {
        labelChild.push(
          childAccess.type.split("_")[1].charAt(0).toUpperCase() +
            childAccess.type.split("_")[1].slice(1)
        );
      });

      return (
        <li key={index}>
          <DropdownAccessWrapperComponent
            access={access}
            updateAccess={onUpdateAccess}
            renderAccessTree={renderAccessTree}
            parentIndex={index}
            user={user}
            setSave={setSave}
          ></DropdownAccessWrapperComponent>
        </li>
      );
    } else {
      return (
        <li key={index}>
          <div className="access-wrapper">
            <div className="inner-access-wrapper">
              <span className="title">
                {!access.type.includes("_")
                  ? access.type.charAt(0).toUpperCase() + access.type.slice(1)
                  : access.type.split("_")[1].charAt(0).toUpperCase() +
                    access.type.split("_")[1].slice(1)}
              </span>
              <span
                className="switch"
                onClick={() => {
                  setSave(true);
                  onUpdateAccess(access, parentIndex);
                }}
              >
                <IOSSwitch checked={access.status} name={access.type} />
              </span>
            </div>
          </div>
        </li>
      );
    }
  };

  const onReset = () => {
    const defaultUserState = JSON.parse(localStorage.getItem(user.uid));

    setUserState({
      ...user,
      data: {
        ...user.data,
        name: defaultUserState.name,
        level: defaultUserState.level,
        access: defaultUserState.access,
      },
    });
    setUsername(defaultUserState.name);
    setSelectedLevel(defaultUserState.level.level_id);
    setAccess(defaultUserState.access);
    setDisabled(defaultUserState.disabled);
    setSave(false);
  };

  const onSubmit = async () => {
    const res = await firebase.updateUserData(userState);
    if (res.success) {
      localStorage.setItem(user.uid, JSON.stringify(userState.data));
      setSave(false);
    } else {
      console.log(res.error);
    }
  };

  const onUpdateAccess = (target = {}, parentIndex) => {
    const tempParentAccess = [...access];
    if (parentIndex) {
      const tempChildAccess = [...tempParentAccess[parentIndex].child];
      const childAccessIndex = tempChildAccess.indexOf(target);
      tempChildAccess[childAccessIndex].status = !tempChildAccess[
        childAccessIndex
      ].status;
      tempParentAccess[parentIndex].child = tempChildAccess;
    } else {
      const accessIndex = tempParentAccess.indexOf(target);
      tempParentAccess[accessIndex].status = !tempParentAccess[accessIndex]
        .status;
      if (tempParentAccess[accessIndex].child) {
        tempParentAccess[accessIndex].child.map((childAccess) => {
          if (childAccess.status !== tempParentAccess[accessIndex].status) {
            childAccess.status = !childAccess.status;
          }
        });
      }
    }
    setAccess(tempParentAccess);
    setUserState({
      ...user,
      data: {
        ...user.data,
        access: tempParentAccess,
      },
    });
  };

  useEffect(() => {
    detectOnBlur(displayNameRef, editName, setEditName);
  }, [editName, displayNameRef]);

  useEffect(() => {
    localStorage.setItem(user.uid, JSON.stringify(user.data));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="inner-user-wrapper">
        <div className="upper-user">
          <div className="inner-upper-user">
            <div className="left">
              <Avatar
                size={"40px"}
                round={"30%"}
                // style={{ width: "100%", height: "250px" }}
                maxInitials={2}
                colors={colors}
                name={user.data.name}
              />
            </div>

            <div className="right">
              <div className="display-name-wrapper" ref={displayNameRef}>
                <input
                  type="text"
                  ref={inputRef}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUserState({
                      ...user,
                      data: {
                        ...user.data,
                        name: e.target.value,
                      },
                    });
                    if (!save) {
                      setSave(true);
                    }
                  }}
                  autoFocus={true}
                  disabled={editName ? false : true}
                />
                <span
                  className="bottom-border"
                  style={{ width: editName && "100%" }}
                ></span>
                <span
                  className="edit-icon"
                  onClick={() => {
                    setEditName(!editName);
                    setTimeout(() => {
                      inputRef.current.focus();
                    }, 500);
                  }}
                >
                  <Edit style={{ fontSize: "15px", cursor: "pointer" }} />
                </span>
              </div>
              <div className="level-wrapper">
                <select
                  name="level"
                  id="level"
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setUserState({
                      ...user,
                      data: {
                        ...user.data,
                        level: levels.find(
                          (level) => level.level_id === e.target.value
                        ),
                      },
                    });
                    if (!save) {
                      setSave(true);
                    }
                  }}
                >
                  {levels.map((level, index) => {
                    return (
                      <option key={index} value={level.level_id}>
                        {level.level}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="lower-user">
          <div className="inner-lower-user">
            <ul>
              {access &&
                access.map((access, index) => {
                  return renderAccessTree(access, index);
                })}
            </ul>

            <div className="action-btn-wrapper">
              <div className="left">
                <span>Disabled : </span>
                <span
                  className="switch"
                  onClick={() => {
                    setSave(true);
                    setDisabled(!disabled);
                    setUserState({
                      ...user,
                      data: {
                        ...user.data,
                        disabled: !disabled,
                      },
                    });
                  }}
                >
                  <IOSSwitch checked={disabled} name={access.type} />
                </span>
              </div>
              <div className="right">
                <button
                  className="btn text-danger"
                  type="button"
                  onClick={() => onReset()}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  disabled={!save}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const User = ({ user, levels, users, currentUser, type = "ready" }) => {
  return (
    <div className="user">
      {type === "ready" ? (
        <UserForm user={user} levels={levels}></UserForm>
      ) : (
        <UserSkeleton></UserSkeleton>
      )}
    </div>
  );
};

export default User;
