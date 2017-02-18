import React from 'react';

export default function TimeRow(){ 
	return(
		<div className="timeRow">
			<div className="timeRow__item"></div>
			<div className="timeRow__item timeRow__item--all">
				<span>all day</span>
			</div>
			<div className="timeRow__item">
				<span className="timeRow__text">00:00</span>
				<span className="timeRow__line"></span>
			</div>
			<div className="timeRow__item">
				<span className="timeRow__text">03:00</span>
				<span className="timeRow__line"></span>
			</div>
			<div className="timeRow__item">
				<span className="timeRow__text">06:00</span>
				<span className="timeRow__line"></span>
			</div>
			<div className="timeRow__item">
				<span className="timeRow__text">09:00</span>
				<span className="timeRow__line"></span>
			</div>
			<div className="timeRow__item">
				<span className="timeRow__text">12:00</span>
				<span className="timeRow__line"></span>
			</div>
			<div className="timeRow__item">
				<span className="timeRow__text">15:00</span>
				<span className="timeRow__line"></span>
			</div>
			<div className="timeRow__item">
				<span className="timeRow__text">18:00</span>
				<span className="timeRow__line"></span>
			</div>
			<div className="timeRow__item">
				<span className="timeRow__text">21:00</span>
				<span className="timeRow__line"></span>
			</div>
		</div>
	);
}