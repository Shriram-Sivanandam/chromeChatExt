export const initialState = {
	username: "",
	roomCode: "",
	url: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_DETAILS":
			return {
				...state,
				user: action.user,
				roomCode: action.roomCode,
				url: action.url,
			};
		default:
			return state;
	}
};

export default reducer;
