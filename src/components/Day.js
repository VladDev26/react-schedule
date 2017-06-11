import React from "react";

export default ({ schedule, day }) => {
	const HOURS = 24;

	const element = [];

	for (let i = 0; i < HOURS; i++) {
		const range = (i + 1) * 60 - 1;

		const isActive = schedule.map(elem => {
			if (range >= elem.bt && range <= elem.et) {
				return "child active";
			}
			return "child";
		});

		element.push(
			<div
				key={i}
				data-range={range}
				data-day={day}
				className={isActive.includes("child active") ? "child active" : "child"}
			/>
		);
	}

	return (
		<div>
			{element}
		</div>
	);
};
