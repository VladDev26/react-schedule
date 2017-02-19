import React, { Component } from 'react';
import { connect } from 'react-redux';

import Day from '../../components/Day';
import TimeRow from '../../components/timeRow';
import DayNames from '../../components/dayNames';
import AllDay from '../../components/allDay';

import Controls from '../Controls';

import * as action from './actions';


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
		const allDayClick = this.handleAllDayClick.bind(this);
		const schedule = this.props.schedule;


		let dayRow = Object.keys(schedule).map(
			i => <Day key={i} schedule={schedule[i]} day={i} />
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

				<Controls />
				
			</div>
		);
	}
}





const mapStateToProps = store => {
	console.log(store.appReducer);
	return {
		schedule: store.appReducer
	};
};
const mapDispatchToProps = dispatch => {
	return {
		fetchInitial: () => dispatch(
			action.fetchInitial()),
		setNewDaySchedule: obj => dispatch(
			action.setNewDaySchedule(obj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);








































