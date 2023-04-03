export const getUsers = (payload) => {
  return {
    type: "GET_USERS",
    payload,
  }
}