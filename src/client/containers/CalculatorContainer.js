/* eslint react/prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'
<<<<<<< HEAD
import Timeout from 'await-timeout'

import { set, loadConfig, calculate } from '../actions/calculation'
=======

import { loadConfig, calculate } from '../actions/calculation'
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
import Loading from '../components/Loading'
import Calculator from '../components/Calculator'

class CalculatorContainer extends React.Component {

  componentDidMount() {
<<<<<<< HEAD
    this.changeTimeout = null
    this.props.init()
  }

  componentWillUnmount() {
    clearTimeout(this.changeTimeout)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.amount !== newProps.amount || this.props.term !== newProps.term) {
      // do not delay first time
      const delayInMilliseconds = this.props.amount ? 100 : 0

      clearTimeout(this.changeTimeout)
      this.changeTimeout = setTimeout(() => {
        this.props.calculate(this.props.amount, this.props.term)
      }, delayInMilliseconds)
    }
  }

  render() {
    if (!this.props.amount || !this.props.term) {
=======
    this.props.init()
  }

  render() {
    if (this.props.config.status !== 'done') {
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
      return <Loading />
    }

    return <Calculator
      amount={this.props.amount}
      term={this.props.term}
      config={this.props.config.payload}
      result={this.props.result.payload}
<<<<<<< HEAD
      change={(amount, term) => this.props.change(amount, term)}
=======
      calculate={(amount, term) => this.props.calculate(amount, term)}
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
    />
  }
}

const mapStateToProps = (state, props) => ({
  ...state.calculation
})

const mapDispatchToProps = (dispatch, props) => ({
  init: () => {
    dispatch(loadConfig())
<<<<<<< HEAD
      .then((config) => {
        dispatch(set({ amount: config.amountInterval.defaultValue, term: config.termInterval.defaultValue }))
    })
  },
  change: (amount, term) => {
    dispatch(set({ amount, term }))
=======
      .then((result) => {
        dispatch(calculate({
          amount: result.amountInterval.defaultValue,
          term: result.termInterval.defaultValue
        }))
      })
>>>>>>> d11d39491303890c54f8ab13e2720120bbd9555d
  },
  calculate: (amount, term) => {
    dispatch(calculate({ amount, term }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorContainer)
