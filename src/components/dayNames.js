import React from "react";

export default function DayNames({ schedule }) {
	const name = Object.keys(schedule).map(i => {
		const isActive = !!schedule[i].length;

		return (
			<div
				key={i}
				className={isActive ? "dayNames__item active" : "dayNames__item"}
			>
				{i}
			</div>
		);
	});
	return (
		<div className="dayNames">
			{name}
		</div>
	);
}
