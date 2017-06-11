import React from "react";

export default ({ schedule, allDayClick }) => {
	const allDay = Object.keys(schedule).map(i => {
		const item = schedule[i];
		const hasLength = !!item.length;

		const isActive = hasLength && item[0].bt === 0 && item[0].et === 1439;

		return (
			<div
				key={i}
				data-allday={i}
				className={isActive ? "allday__item active" : "allday__item"}
				onClick={allDayClick}
			/>
		);
	});
	return (
		<div className="allday">
			{allDay}
		</div>
	);
};
