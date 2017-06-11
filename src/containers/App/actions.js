export function fetchInitial() {
  return { type: "FETCH_INITIAL" };
}

export function setNewDaySchedule(obj) {
  return {
    type: "SET_NEW_DAY_SCHEDULE",
    payload: obj
  };
}

export function clearSchedule(obj) {
  return {
    type: "CLEAR_SCHEDULE",
    payload: obj
  };
}
