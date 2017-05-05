import React from 'react'
import { Component } from 'react';

import CurrenciesList from './currencies_list';
import CurrenciesBadges from './currencies_badges';
import CurrencyAutocomplete from './currency_autocomplete';

import { flatten } from '../utils/utils'

const REAL = "REAL";
const CRYPTO = "CRYPTO";

export default class CurrenciesContainer extends Component {
  constructor(props) {
    super(props)

    const currencies = flatten([this.props.crypto_currencies.map((currency) => {
      return Object.assign({}, { value: 1, type: CRYPTO }, currency)
    }), this.props.real_currencies.map((currency) => {
      return Object.assign({}, { value: 1, type: REAL }, currency)
    })])

    this.state = {
      currencies: currencies,
      pivot: { code: "BTC", value: 1 }
    }
  }

  componentDidMount() {
   this.refreshRates()

   this.timer = setInterval(() =>  this.refreshRates(), 10000)
  }

  componentWillUnount() {
    clearInterval(this.timer)
  }

  refreshRates() {
    const currencies_codes = this.state.currencies.map((currency) => currency.code).join(',')
    const url = `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${currencies_codes}`

    fetch(url).then((response) => response.json())
    .then((json) => {
      this.setState({
        btc_rates: json
      })

      this.refreshValues(this.state.pivot.code, this.state.pivot.value)
    })
  }

  refreshValues(fromCode, value) {
    const valueF = parseFloat(value)

    const BTCValue = (fromCode == "BTC") ? valueF : valueF / this.state.btc_rates[fromCode]

    const new_currencies = this.state.currencies.map((currency) => {
      let new_currency = Object.assign({}, currency)

      if (currency.code != fromCode) {
        if (currency.code != "BTC") {
          new_currency.value = this.state.btc_rates[currency.code] * BTCValue
        } else {
          new_currency.value = BTCValue
        }
      }

      new_currency.value = isNaN(new_currency.value) ? 0 : new_currency.value//Number(new_currency.value).toFixed(6)

      return new_currency;
    })

    this.setState({
      pivot: { code: fromCode, value: value },
      currencies: new_currencies
    })
  }

  removeCurrency(code) {
    if (code != "BTC") {
      const currencies = this.state.currencies.filter((currency) => {
        return currency.code != code
      })

      this.setState({
        currencies: currencies
      })
    }
  }

  addCurrency(coinName) {
    const newCoin = this.props.availables_currencies.find(currency => currency.CoinName == coinName)

    if (this.state.currencies.find(currency => currency.code == newCoin.Name)) {
      return;
    }

    const currencies = [].concat(this.state.currencies, [ {
      code: newCoin.Name, name: newCoin.CoinName, value: 1, type: CRYPTO
    } ])

    this.setState({
      currencies: currencies
    }, () => {
      this.refreshRates()
    })
  }

  render() {
    const currencies = this.state.currencies.reduce((currencies, currency) => {
      if (currency.type == REAL) {
        currencies.real.push(currency)
      } else {
        currencies.crypto.push(currency)
      }
      return currencies
    }, { crypto: [], real: [] })

    return (
      <div className="container-fluid">
        <h1 className="text-md-center">Crypto Coins Converter</h1>
        <div>
          <CurrenciesBadges
            realCurrencies={currencies.real}
            cryptoCurrencies={currencies.crypto}
            handleClickCurrency={(code) => this.removeCurrency(code)}
          />
          <CurrenciesList
            realCurrencies={currencies.real}
            cryptoCurrencies={currencies.crypto}
            handleCurrencyChange={(code, value) => this.refreshValues(code, value)}
          />
          <CurrencyAutocomplete
            availables_currencies={this.props.availables_currencies}
            selected_currencies={currencies.crypto.map(currency => currency.code)}
            handleSelectCurrency={(coinName) => this.addCurrency(coinName)}
          />
        </div>
      </div>
    )
  }
}

CurrenciesContainer.defaultProps = {
    crypto_currencies: [
        { code: "BTC", name: "Bitcoin" }, { code: "ETH", name: "Ethereum" },
    ],
    real_currencies: [
        { code: "USD", name: "US Dollar" }, { code: "EUR", name: "Euro" },
        { code: "GBP", name: "British Pound" }, { code: "KRW", name: "South Corean Won" },
        { code: "JPY", name: "Japanese Yen" }, { code: "CAD", name: "Canadian Dollar" }
    ]
}
