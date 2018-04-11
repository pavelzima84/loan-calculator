import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from 'rc-slider'

import Select from '../components/Select'
import CalculationTable from '../components/CalculationTable'

export default class Calculator extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      amount: this.getDefaultValue('amountInterval'),
      term: this.getDefaultValue('termInterval')
    }
  }

  render() {
    let amount,
        term

    if (this.props.calculation.status === 'init') {
      amount = this.getDefaultValue('amountInterval')
      term = this.getDefaultValue('termInterval')
    } else {
      amount = this.props.calculation.amount
      term = this.props.calculation.term
    }

    return (
      <div>
          <div>
            <b>Amount:</b>

            <Slider
              value={amount}
              min={this.props.config.amountInterval.min}
              max={this.props.config.amountInterval.max}
              step={this.props.config.amountInterval.step}
              onChange={(value) => { this.handleAmountChange(value) }}
            />

            <Select
              value={amount}
              options={this.getSelectOptions('amountInterval')}
              select={(value) => { this.handleAmountChange(value) }}
            />
          </div>

          <div>
            <b>Term:</b>

            <Slider
              value={term}
              min={this.props.config.termInterval.min}
              max={this.props.config.termInterval.max}
              step={this.props.config.termInterval.step}
              onChange={(value) => { this.handleTermChange(value) }}
            />

            <Select
              value={term}
              options={this.getSelectOptions('termInterval')}
              select={(value) => { this.handleTermChange(value) }}
            />
          </div>

          <hr />

          <CalculationTable {...this.props.calculation.payload} />
      </div>
    )
  }

  handleAmountChange(value) {
    let amount = parseInt(value)

    this.props.calculate(amount, this.state.term)
  }

  handleTermChange(value) {
    let term = parseInt(value)

    this.props.calculate(this.state.amount, term)
  }

  getSelectOptions(name) {
    let
      { min, max, step } = this.props.config[name],
      options = [],
      i

    for (i = min; i <= max; i += step) {
      options.push(i)
    }

    return options
  }

  getDefaultValue(name) {
    return this.props.config[name].defaultValue
  }
}

Calculator.propTypes = {
  config: PropTypes.object.isRequired,
  calculate: PropTypes.func.isRequired
}
