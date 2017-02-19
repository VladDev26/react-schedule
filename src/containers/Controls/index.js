import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../App/actions';


class Controls extends Component{

	handleSaveClick(){
		const schedule = this.props.schedule;

		Object.keys(schedule).map(day => {

			function isExistsAndActive(i){
				return !!elements[i] && 
					elements[i].classList.contains('active');
			}

			function getTime(i){
				let range = elements[i].getAttribute('data-range');
				return {
					bt: range-59, 
					et: +range
				};
			}

			const elements = [].slice.call(
				document.querySelectorAll('[data-day='+day+']'));

			const bts = [];
			const ets = [];

			for(let i=0; i<elements.length; i++){

				let prev = isExistsAndActive(i-1);
				let current = isExistsAndActive(i);
				let next = isExistsAndActive(i+1);

				switch(true){
					//SINGLE
					case (current && !prev && !next):
						bts.push( getTime(i).bt );
						ets.push( getTime(i).et );
						break;
					//FIRST
					case (current && !prev && next):
						bts.push( getTime(i).bt );
						break;
					//LAST
					case (current && prev && !next):
						ets.push( getTime(i).et );
						break;
					default:
						break;
				}
			}

			const all = [];
			for(let i=0; i<bts.length; i++){
				all.push({
					bt: bts[i],
					et: ets[i]
				});
			}

			// console.log(all);

			this.props.setNewDaySchedule({day, arr5: all});
		});
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


	render(){
		const saveClick = this.handleSaveClick.bind(this);
		const clearClick = this.handleClearClick.bind(this);

		return(
			<div className="controls">
				<button className="button" onClick={saveClick}>
					save
				</button>
				<button className="button" onClick={clearClick}>
					clear
				</button>
			</div>		
		);
	}
}





const mapStateToProps = store => {
	return {
		schedule: store.appReducer
	};
};
const mapDispatchToProps = dispatch => {
	return {
		setNewDaySchedule: obj => dispatch(
			action.setNewDaySchedule(obj)),
		clearSchedule: obj => dispatch(
			action.clearSchedule(obj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);








































