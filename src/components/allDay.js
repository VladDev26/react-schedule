import React from 'react';

export default function AllDays({schedule, allDayClick}){

	let allDay = Object.keys(schedule).map(i => {
		let item = schedule[i];
		let hasLength = !!item.length;

		let isActive = hasLength && (item[0].bt === 0) && (item[0].et === 1439);

		return(
			<div key={i} data-allday={i} 
				className={isActive ? "allday__item active" : "allday__item"} 
				onClick={allDayClick}>
			</div>
		);
	});
	return(
		<div className="allday">
			{allDay}
		</div>
	);
}