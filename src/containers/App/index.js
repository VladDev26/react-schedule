import React, { Component } from 'react';
import { connect } from 'react-redux';

import Day from '../../components/Day';
import TimeRow from '../../components/timeRow';
import DayNames from '../../components/dayNames';
import AllDay from '../../components/allDay';

import * as action from './actions';

const arr = [];
for(let i=0; i<24; i++){ arr.push(i); }


class App extends Component{
	constructor(){
		super();
		this.mouseenterHandler = e => {
			e.target.classList.toggle('active');
		}
	}

	componentDidMount(){
		this.props.fetchInitial();
	}

	handleMouseDown(e){
		if(!e.target.classList.contains('child')) return;

		e.target.classList.toggle('active');
		let siblings = e.target.parentNode.childNodes;
		let mouseenterHandler = this.mouseenterHandler;


		siblings.forEach(i => {
			if(i !== e.target){
				i.addEventListener('mouseenter', mouseenterHandler);
				i.addEventListener('mouseleave', () => {
					i.removeEventListener('mouseenter', mouseenterHandler);
				});
			}
		});
	}

	handleMouseUp(e){
		e.preventDefault();
		let siblings = document.querySelectorAll('.child');
		let mouseenterHandler = this.mouseenterHandler;

		siblings.forEach(i => {
			i.removeEventListener('mouseenter', mouseenterHandler);
		});
	}

	handleSaveClick(){
		const schedule = this.props.schedule;

		Object.keys(schedule).map(day => {

			let elements = document.querySelectorAll('[data-day='+day+']');
			let arr = [];

			for(let i=0; i<elements.length; i++){
				let isActive = elements[i].classList.contains('active');

				if(isActive){
					let range = elements[i].getAttribute('data-range');
					let bt = range - 59;
					let et = +range;
					arr.push({bt, et});
				}else{
					arr.push(false);
				}
			}

			let arr3 = [];
			let arr2 = [];
			for(let i=0; i<arr.length+1; i++){
				if(arr[i]){
					arr2.push(arr[i]);
				}else{
					arr3.push(arr2);
					arr2 = [];
				}
			}

			let arr4 = arr3.filter(i => i.length);

			let arr5 = [];
			arr4.map((el,i) => {
				let obj = {};
				if(el.length == 1){
					obj.bt = el[0].bt;
					obj.et = el[0].et;
					arr5.push(obj);
				}else{
					let last = el.length-1;
					obj.bt = el[0].bt;
					obj.et = el[last].et;
					arr5.push(obj);
				}
			});

			this.props.setNewDaySchedule({day, arr5});
		});
		console.log(schedule);
	}

	handleClearClick(){
		let schedule = this.props.schedule;
		for(let day in schedule){
			schedule[day] = [];
		}

		// console.log('schedule', schedule);
		this.props.clearSchedule(schedule);
		let siblings = document.querySelectorAll('.child');
		siblings.forEach(el => {el.classList.remove('active');});
	}

	handleAllDayClick(e){
		let isActive = e.target.classList.contains('active');
		let day = e.target.getAttribute('data-allday');
		let row = document.querySelectorAll('[data-day='+day+']');
		const obj = {};

		if(isActive){
			obj[day] = [];
		}else{
			obj[day] = [{bt: 0, et: 1439}];
		}
		
		this.props.setNewDaySchedule({day, arr5: obj[day]});
	}

	render(){
		const mouseUp = this.handleMouseUp.bind(this);
		const mouseDown = this.handleMouseDown.bind(this);
		const saveClick = this.handleSaveClick.bind(this);
		const clearClick = this.handleClearClick.bind(this);
		const allDayClick = this.handleAllDayClick.bind(this);
		const schedule = this.props.schedule;


		let dayRow = Object.keys(schedule).map(
			i => <Day key={i} schedule={schedule[i]} arr={arr} day={i} />
		);


		return(
			<div className="wrapper" onMouseUp={mouseUp}
				onDragStart={e => e.preventDefault()}
			>
				<TimeRow />

				<DayNames schedule={schedule} />

				<AllDay schedule={schedule} allDayClick={allDayClick} />
				
				<div className="myContainer" onMouseDown={mouseDown}>
					{dayRow}
				</div>

				<div className="controls">
					<button className="button" onClick={saveClick}>
						save
					</button>
					<button className="button" onClick={clearClick}>
						clear
					</button>
				</div>
			</div>
		);
	}
}





const mapStateToProps = store => {
	// console.log(store.appReducer);
	return {
		schedule: store.appReducer
	};
};
const mapDispatchToProps = dispatch => {
	return {
		fetchInitial: () => dispatch(
			action.fetchInitial()),
		setNewDaySchedule: obj => dispatch(
			action.setNewDaySchedule(obj)),
		clearSchedule: obj => dispatch(
			action.clearSchedule(obj)),
		setAllDay: obj => dispatch(
			action.setAllDay(obj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);








































