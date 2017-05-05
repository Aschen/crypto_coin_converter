import React from 'react'
import { Component } from 'react';

import CurrencyBadge from './currency_badge';

export default class CurrenciesBadges extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="badge-container row">
        <div className="col-md-6">
          {
            this.props.cryptoCurrencies.map((currency) => {
              return ( <CurrencyBadge key={currency.code}
                                      handleClick={(code) => this.props.handleClickCurrency(code)}
                                      togglable={currency.code != 'BTC'}
                                      currencyCode={currency.code} /> )
            })
          }
        </div>
        <div className="col-md-6">
          {
            this.props.realCurrencies.map((currency) => {
              return ( <CurrencyBadge key={currency.code}
                                      handleClick={(code) => this.props.handleClickCurrency(code)}
                                      togglable={false}
                                      currencyCode={currency.code} /> )
            })
          }
        </div>
      </div>
    )
  }
}
