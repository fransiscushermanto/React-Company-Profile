import { USER_LOGGED_IN, USER_SIGNED_OUT } from "../actions/types";

const DEFAULT_STATE = {
  user: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, user: action.payload };

    case USER_SIGNED_OUT:
      return state;

    default:
      return state;
  }
};
