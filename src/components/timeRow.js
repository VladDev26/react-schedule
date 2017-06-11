import React from "react";

export default () => {
	const arr = [];
	for (let i = 0; i < 8; i++) {
		arr.push(i);
	}

	const items = arr.map(item => {
		const hours = (item *= 3);
		return (
			<div key={item} className="timeRow__item">
				<span className="timeRow__text">{hours}:00</span>
				<span className="timeRow__line" />
			</div>
		);
	});

	return (
		<div className="timeRow">
			<div className="timeRow__item" />
			<div className="timeRow__item timeRow__item--all">
				<span>all day</span>
			</div>

			{items}
		</div>
	);
};
