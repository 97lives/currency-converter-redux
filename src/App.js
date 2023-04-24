import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchRates } from "./redux/actions";
import "./index.css";

const App = ({ fetchRates, rates, error }) => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("TZS");
  const [amount, setAmount] = useState(1);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRates(baseCurrency, targetCurrency);
  };

  let result = null;
  if (rates) {
    const convertedAmount = (amount * rates).toFixed(2);
    result = (
      <p>
        {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
      </p>
    );
  } else if (error) {
    result = <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Base currency:</label>
          <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div>
          <label>Target currency:</label>
          <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
            <option value="TZS">TZS</option>
            <option value="KES">KES</option>
            <option value="UGX">UGX</option>
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
        </div>
        <button type="submit">Convert</button>
      </form>
      {result}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rates: state.rates,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRates: (baseCurrency, targetCurrency) =>
      dispatch(fetchRates(baseCurrency, targetCurrency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);