import React, { Component } from "react";

class Controls extends Component {
	constructor() {
		super();
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.handleClearClick = this.handleClearClick.bind(this);
	}
	handleSaveClick() {
		const schedule = this.props.schedule;

		Object.keys(schedule).map(day => {
			function isExistsAndActive(i) {
				return !!elements[i] && elements[i].classList.contains("active");
			}

			function getTime(i) {
				let range = elements[i].getAttribute("data-range");
				return {
					bt: range - 59,
					et: +range
				};
			}

			const elements = [].slice.call(
				document.querySelectorAll("[data-day=" + day + "]")
			);

			const bts = [];
			const ets = [];

			for (let i = 0; i < elements.length; i++) {
				const prev = isExistsAndActive(i - 1);
				const current = isExistsAndActive(i);
				const next = isExistsAndActive(i + 1);

				switch (true) {
					//SINGLE
					case current && !prev && !next:
						bts.push(getTime(i).bt);
						ets.push(getTime(i).et);
						break;
					//FIRST
					case current && !prev && next:
						bts.push(getTime(i).bt);
						break;
					//LAST
					case current && prev && !next:
						ets.push(getTime(i).et);
						break;
					default:
						break;
				}
			}

			const all = [];
			for (let i = 0; i < bts.length; i++) {
				all.push({
					bt: bts[i],
					et: ets[i]
				});
			}

			this.props.setNewDaySchedule({ day, arr5: all });
		});
	}

	handleClearClick() {
		const { schedule, clearSchedule } = this.props;
		for (let day in schedule) {
			schedule[day] = [];
		}

		// console.log('schedule', schedule);
		clearSchedule(schedule);
		const siblings = document.querySelectorAll(".child");
		siblings.forEach(el => {
			el.classList.remove("active");
		});
	}

	render() {
		console.log(this);
		const { handleSaveClick, handleClearClick } = this;

		return (
			<div className="controls">
				<button className="button" onClick={handleSaveClick}>
					save
				</button>
				<button className="button" onClick={handleClearClick}>
					clear
				</button>
			</div>
		);
	}
}

export default Controls;
