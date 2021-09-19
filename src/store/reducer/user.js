const users = [];

const initialState = {
  users,
};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_USERS":
      return {
        ...state,
        users: payload,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [payload, ...state.users],
      };
    default:
      return state;
  }
};

export default UserReducer;
