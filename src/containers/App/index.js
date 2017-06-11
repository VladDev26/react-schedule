import React, { Component } from "react";
import { connect } from "react-redux";

import Day from "../../components/Day";
import TimeRow from "../../components/timeRow";
import DayNames from "../../components/dayNames";
import AllDay from "../../components/allDay";

import Controls from "../Controls";

import * as action from "./actions";

class App extends Component {
	constructor() {
		super();
		this.mouseenterHandler = e => {
			e.target.classList.toggle("active");
		};
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleAllDayClick = this.handleAllDayClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchInitial();
	}

	handleMouseDown(e) {
		if (!e.target.classList.contains("child")) return;

		e.target.classList.toggle("active");
		const siblings = e.target.parentNode.childNodes;
		const mouseenterHandler = this.mouseenterHandler;

		siblings.forEach(i => {
			if (i !== e.target) {
				i.addEventListener("mouseenter", mouseenterHandler);
				i.addEventListener("mouseleave", () => {
					i.removeEventListener("mouseenter", mouseenterHandler);
				});
			}
		});
	}

	handleMouseUp(e) {
		e.preventDefault();
		const siblings = document.querySelectorAll(".child");
		const mouseenterHandler = this.mouseenterHandler;

		siblings.forEach(i => {
			i.removeEventListener("mouseenter", mouseenterHandler);
		});
	}

	handleAllDayClick(e) {
		const isActive = e.target.classList.contains("active");
		const day = e.target.getAttribute("data-allday");
		const row = document.querySelectorAll("[data-day=" + day + "]");
		const obj = {};

		if (isActive) {
			obj[day] = [];
		} else {
			obj[day] = [{ bt: 0, et: 1439 }];
		}

		this.props.setNewDaySchedule({ day, arr5: obj[day] });
	}

	render() {
		const { handleMouseUp, handleMouseDown, handleAllDayClick } = this;

		const { schedule } = this.props;

		const dayRow = Object.keys(schedule).map(i =>
			<Day key={i} schedule={schedule[i]} day={i} />
		);

		return (
			<div
				className="wrapper"
				onMouseUp={handleMouseUp}
				onDragStart={e => e.preventDefault()}
			>
				<TimeRow />

				<DayNames schedule={schedule} />

				<AllDay schedule={schedule} allDayClick={handleAllDayClick} />

				<div className="myContainer" onMouseDown={handleMouseDown}>
					{dayRow}
				</div>

				<Controls />

			</div>
		);
	}
}

const mapStateToProps = store => ({ schedule: store.appReducer });

const mapDispatchToProps = dispatch => ({
	fetchInitial: () => dispatch(action.fetchInitial()),
	setNewDaySchedule: obj => dispatch(action.setNewDaySchedule(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
