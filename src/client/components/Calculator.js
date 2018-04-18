import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from 'rc-slider'

import SliderSelectPair from '../components/SliderSelectPair'
import CalculationTable from '../components/CalculationTable'

export default class Calculator extends React.Component {

  render() {
    return (
      <div>
          <SliderSelectPair
            label="Amount"
            value={this.props.amount}
            min={this.props.config.amountInterval.min}
            max={this.props.config.amountInterval.max}
            step={this.props.config.amountInterval.step}
            onChange={(newValue) => { this.handleAmountChanged(newValue) }}
          />

          <SliderSelectPair
            label="Term"
            value={this.props.term}
            min={this.props.config.termInterval.min}
            max={this.props.config.termInterval.max}
            step={this.props.config.termInterval.step}
            onChange={(newValue) => { this.handleTermChanged(newValue) }}
          />

          <hr />

          <CalculationTable {...this.props.result} />
      </div>
    )
  }

  handleAmountChanged(newAmount) {
    this.props.change(newAmount, this.props.term)
  }

  handleTermChanged(newTerm) {
    this.props.change(this.props.amount, newTerm)
  }
}

Calculator.propTypes = {
  config: PropTypes.object.isRequired,
  result: PropTypes.object,
  amount: PropTypes.number.isRequired,
  term: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired
}
