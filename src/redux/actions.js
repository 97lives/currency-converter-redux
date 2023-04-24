import axios from "axios";

export const FETCH_RATES_SUCCESS = "FETCH_RATES_SUCCESS";
export const FETCH_RATES_FAILURE = "FETCH_RATES_FAILURE";

const fetchRatesSuccess = (rates) => {
  return {
    type: FETCH_RATES_SUCCESS,
    payload: rates,
  };
};

const fetchRatesFailure = (error) => {
  return {
    type: FETCH_RATES_FAILURE,
    payload: error,
  };
};

export const fetchRates = (baseCurrency, targetCurrency) => {
  return (dispatch) => {
    axios
      .get(`http://www.floatrates.com/daily/${baseCurrency}.json`)
      .then((response) => {
        const data = response.data;
        const targetRate = data[targetCurrency.toLowerCase()].rate;
        dispatch(fetchRatesSuccess(targetRate));
      })
      .catch((error) => {
        dispatch(fetchRatesFailure(error.message));
      });
  };
};
