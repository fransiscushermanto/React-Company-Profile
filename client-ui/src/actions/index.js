import { USER_LOGGED_IN, USER_SIGNED_OUT } from "../actions/types";

export const signIn = (data) => {
  return (dispatch) => {
    try {
      console.log(data);
      dispatch({
        type: USER_LOGGED_IN,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: USER_SIGNED_OUT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
