// import React from "react";
import { connect } from "react-redux";

import * as action from "../actions";

import Controls from "../components/Controls";

const mapStateToProps = store => ({
  schedule: store.appReducer
});
const mapDispatchToProps = dispatch => ({
  setNewDaySchedule: obj => dispatch(action.setNewDaySchedule(obj)),
  clearSchedule: obj => dispatch(action.clearSchedule(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
