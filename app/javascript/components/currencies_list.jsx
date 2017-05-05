import React from 'react'
import { Component } from 'react';

import Currency from './currency';

export default class CurrenciesList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main-container row">
        <div className="col-md-6 currencies-column-container">
          <h3>Crypto Currencies</h3>
          {
            this.props.cryptoCurrencies.map((currency) => {
              return <Currency key={currency.value + currency.code} value={currency.value} code={currency.code} handleCurrencyChange={this.props.handleCurrencyChange}/>
            })
          }
        </div>
        <div className="col-md-6 currencies-column-container">
          <h3>Real Currencies</h3>
          {
            this.props.realCurrencies.map((currency) => {
              return <Currency key={currency.value + currency.code} value={currency.value} code={currency.code} handleCurrencyChange={this.props.handleCurrencyChange}/>
            })
          }
        </div>
      </div>
    )
  }
}
