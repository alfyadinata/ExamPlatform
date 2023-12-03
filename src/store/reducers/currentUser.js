import sessionUtils from "utils/sessionUtils";

export const SET_CURRENT_USER = "current-user.set";

const initialState = sessionUtils.getUser() || null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return action.data;
  default:
    return state;
  }
};

export default reducer;
