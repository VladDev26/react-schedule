import React from 'react';

export default function TimeRow(){
	let arr = [];
	for(let i=0; i<8; i++){arr.push(i);}

	const items = arr.map(item => (
		<div key={item} className="timeRow__item">
			<span className="timeRow__text">{item*=3}:00</span>
			<span className="timeRow__line"></span>
		</div>
	));

	return(
		<div className="timeRow">
			<div className="timeRow__item"></div>
			<div className="timeRow__item timeRow__item--all">
				<span>all day</span>
			</div>

			{items}
		</div>
	);
}