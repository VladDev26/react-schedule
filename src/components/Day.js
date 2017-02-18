import React from 'react';

function Day({schedule, arr, day}) {
	
	const element = arr.map((item, i) => {

		let range = (i+1)*60 - 1;

		let isActive = schedule.map(elem => {
			if((range >= elem.bt)&&(range <= elem.et)){
				return 'child active';
			}
		});

		return(
			<div key={item} data-range={ range } data-day={ day }
				className={ isActive.includes('child active') ? 'child active' : 'child' }
			></div>
	)});

	return(
		<div>
			{element}
		</div>
	);
}

export default Day;








































