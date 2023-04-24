import { FETCH_RATES_SUCCESS, FETCH_RATES_FAILURE } from "./actions";

const initialState = {
  rates: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RATES_SUCCESS:
      return {
        rates: action.payload,
        error: null,
      };
    case FETCH_RATES_FAILURE:
      return {
        rates: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;