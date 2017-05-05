import React from 'react'
import { Component } from 'react';
import Autocomplete from 'react-autocomplete';

export default class CurrencyAutocomplete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ""
    }
  }

  sortCurrencies(a, b, value) {
    const aLower = a.CoinName.toLowerCase()
    const bLower = b.CoinName.toLowerCase()
    const valueLower = value.toLowerCase()
    const queryPosA = aLower.indexOf(valueLower)
    const queryPosB = bLower.indexOf(valueLower)

    if (queryPosA !== queryPosB) {
      return queryPosA - queryPosB
    }

    return aLower < bLower ? -1 : 1
  }

  matchCurrencyToTerm(currency, value) {
    return currency.CoinName.toLowerCase().indexOf(value.toLowerCase()) !== -1
  }

  renderMenu(items, value, style) {
    return (
      <div style={style} children={items} />
    )
  }

  renderItem(currency, highlighted, styles) {
    const isSelected = this.props.selected_currencies.includes(currency.Name)
    const badgeClass = isSelected ? "badge badge-pill badge-primary" : "badge badge-pill badge-danger"
    const divClass = isSelected ? "autocomplete-unavailable" : "autocomplete-available"

    return (
      <div key={currency.Name} className={divClass}>
        <span>{currency.CoinName}</span>
        <span className={badgeClass}>{currency.Name}</span>
        <img src={currency.ImageUrl} height="20" width="20"/>
      </div>
    )
  }

  handleSelect(coinName) {
    this.setState({
      value: ""
    })

    this.props.handleSelectCurrency(coinName)
  }

  render() {
    return (
      <div className="main-container row">
        <Autocomplete
          value={this.state.value}
          inputProps={{ placeholder: "Type here to add currency", name: 'currency', id: 'currencies-autocomplete' }}
          items={this.props.availables_currencies}
          getItemValue={(item) => item.CoinName}
          shouldItemRender={(currency, value) => this.matchCurrencyToTerm(currency, value)}
          onChange={(event, value) => this.setState({ value })}
          onSelect={value => this.handleSelect(value)}
          renderItem={(item, highlighted, styles) => this.renderItem(item, highlighted, styles)}
        />
      </div>
    )
  }
}
