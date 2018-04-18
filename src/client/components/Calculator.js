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
<<<<<<< HEAD
            onChange={(newValue) => { this.handleAmountChanged(newValue) }}
=======
            onChange={(newValue) => { this.handleAmountChange(newValue) }}
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
          />

          <SliderSelectPair
            label="Term"
            value={this.props.term}
            min={this.props.config.termInterval.min}
            max={this.props.config.termInterval.max}
            step={this.props.config.termInterval.step}
<<<<<<< HEAD
            onChange={(newValue) => { this.handleTermChanged(newValue) }}
=======
            onChange={(newValue) => { this.handleTermChange(newValue) }}
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
          />

          <hr />

          <CalculationTable {...this.props.result} />
      </div>
    )
  }

<<<<<<< HEAD
  handleAmountChanged(newAmount) {
    this.props.change(newAmount, this.props.term)
  }

  handleTermChanged(newTerm) {
    this.props.change(this.props.amount, newTerm)
=======
  handleAmountChange(newAmount) {
    this.props.calculate(newAmount, this.props.term)
  }

  handleTermChange(newTerm) {
    this.props.calculate(this.props.amount, newTerm)
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
  }
}

Calculator.propTypes = {
  config: PropTypes.object.isRequired,
  result: PropTypes.object,
  amount: PropTypes.number.isRequired,
  term: PropTypes.number.isRequired,
<<<<<<< HEAD
  change: PropTypes.func.isRequired
=======
  calculate: PropTypes.func.isRequired
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
}
