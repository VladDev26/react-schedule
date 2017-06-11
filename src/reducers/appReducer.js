const initial = {
	mo: [
		{
			bt: 240,
			et: 779
		}
	],
	tu: [],
	we: [],
	th: [
		{
			bt: 240,
			et: 779
		},
		{
			bt: 1140,
			et: 1319
		}
	],
	fr: [
		{
			bt: 660,
			et: 1019
		}
	],
	sa: [
		{
			bt: 0,
			et: 1439
		}
	],
	su: []
};

export default (state = {}, action) => {
	switch (action.type) {
		case "FETCH_INITIAL":
			return { ...initial };

		case "SET_NEW_DAY_SCHEDULE":
			const { day, arr5 } = action.payload;
			return Object.assign({}, state, { [day]: arr5 });

		case "CLEAR_SCHEDULE":
			const newSchedule = action.payload;
			return { ...newSchedule };

		default:
			return state;
	}
};
