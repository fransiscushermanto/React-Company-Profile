import React, { useEffect, useState } from "react";
import { useFirebase } from "../../../../firebase/FirebaseContext";
import { getListUsers, getAllLevels } from "../../../AuthHelper";

import User from "./User";

const Users = ({ user }) => {
  const firebase = useFirebase();
  const [users, setUsers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [forbidden, setForbidden] = useState(false);
  const updateAccess = (user = {}, target = {}, parentIndex) => {
    const tempUsers = [...users];
    const currentUserIndex = tempUsers.indexOf(user);
    const tempParentAccess = [...tempUsers[currentUserIndex].data.access];
    if (parentIndex) {
      const tempChildAccess = [...tempParentAccess[parentIndex].child];
      const childAccessIndex = tempChildAccess.indexOf(target);
      tempChildAccess[childAccessIndex].status = !tempChildAccess[
        childAccessIndex
      ].status;
      tempParentAccess[parentIndex].child = tempChildAccess;
      tempUsers[currentUserIndex].data.access = tempParentAccess;
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

      tempUsers[currentUserIndex].data.access = tempParentAccess;
    }
    setUsers(tempUsers);
  };

  useEffect(() => {
    getAllLevels(user).then((res) => {
      if (res.success) {
        setLevels(res.levels);
        setForbidden(false);
      } else {
        setForbidden(true);
      }
    });
    getListUsers(user).then((res) => {
      if (res.success) {
        setUsers(res.users);
        setForbidden(false);
      } else {
        setForbidden(true);
      }
    });
  }, [user]);

  useEffect(() => {
    firebase.firestore.collection("users").onSnapshot((snapshot) => {
      snapshot.docChanges().map(() => {
        return getListUsers(user).then((res) => {
          if (res.success) {
            setUsers(res.users);
            setForbidden(false);
          } else {
            setForbidden(true);
          }
        });
      });
    });
  }, [firebase, user]);

  return (
    <div className="dashboard-group users-group">
      <div className="inner-dashboard-group">
        {users.length > 0 && levels.length > 0 ? (
          users.map((userList, index) => {
            return (
              <User
                key={index}
                currentUser={user}
                user={userList}
                users={users}
                levels={levels}
              />
            );
          })
        ) : forbidden ? (
          <div style={{ width: "100%", height: "100%" }}>
            <span style={{ fontSize: "50px", fontWeight: "700" }}>
              Forbidden
            </span>
          </div>
        ) : (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <User type="skeleton" key={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
