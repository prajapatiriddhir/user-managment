export const updateUserAction = (users) => ({
  type: "UPDATE_USERS",
  payload: users,
});

export const addUserAction = (user) => ({ type: "ADD_USER", payload: user });
