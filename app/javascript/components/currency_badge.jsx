import React from 'react'
import { Component } from 'react';

export default class CurrencyBadge extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick() {
    if (this.props.togglable) {
      this.props.handleClick(this.props.currencyCode)
    }
  }

  render() {
    var className = "badge badge-pill badge-primary"
    if (this.props.togglable) {
      className += " badge-togglable"
    }

    return (
      <span className={className}
            onClick={() => this.handleClick()} >
      {this.props.currencyCode}
      </span>
    )
  }
}
