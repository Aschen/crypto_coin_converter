import React from 'react'
import { Component } from 'react';

export default class Currency extends Component {

  render() {
    return (
      <div className="form-group">
        <div className="input-icon input-icon-right">
          <i>{this.props.code}</i>
          <input type="text" className="form-control" defaultValue={Number(this.props.value).format(6, 3, ',')} ref={(input) => this.input = input} onChange={(evt) => this.props.handleCurrencyChange(this.props.code, evt.target.value)}/>
        </div>
      </div>
    )
  }
}
