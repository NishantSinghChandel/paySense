import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const exampleInitialState = {
	imageList: []
};

export const actionTypes = {
	SET_IMAGE_LIST: "SET_IMAGE_LIST"
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
	switch (action.type) {
		case actionTypes.SET_IMAGE_LIST:
			return Object.assign({}, state, {
				imageList: action.payload
			});
		default:
			return state;
	}
};

// ACTIONS
export const getImageListRequest = () => async dispatch => {
	try {
		//await the response of the fetch call
		let response = await fetch(
			"https://pixabay.com/api/?key=10872664-aa1ddc2ccdcf4e88ddb1ef966&q=yellow+flowers&image_type=photo&pretty=true&per_page=200"
		);
		//proceed once the first promise is resolved.
		let payload = await response.json();
		dispatch({ type: actionTypes.SET_IMAGE_LIST, payload: payload.hits });
		//proceed only when the second promise is resolved
		return payload;
	} catch (err) {
		console.log("Error in store : ", err);
	}
};

export function initializeStore(initialState = exampleInitialState) {
	return createStore(
		reducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunkMiddleware))
	);
}
