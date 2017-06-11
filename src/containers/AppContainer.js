// import React from "react";
import { connect } from "react-redux";

import * as action from "../actions";

import App from "../components/App";

const mapStateToProps = store => ({ schedule: store.appReducer });

const mapDispatchToProps = dispatch => ({
  fetchInitial: () => dispatch(action.fetchInitial()),
  setNewDaySchedule: obj => dispatch(action.setNewDaySchedule(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
