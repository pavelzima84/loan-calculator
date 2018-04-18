/* eslint react/prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import { set, loadConfig, calculate } from '../actions/calculation'
import * as Cache from '../utils/cache'
import Loading from '../components/Loading'
import Calculator from '../components/Calculator'

class CalculatorContainer extends React.Component {

  componentDidMount() {
    this.changeTimeout = null
    this.props.init()
  }

  componentWillUnmount() {
    clearTimeout(this.changeTimeout)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.amount !== newProps.amount || this.props.term !== newProps.term) {
      const
        cacheKey = Cache.createKey(
          'CALCULATION/CALCULATE',
          { amount: newProps.amount, term: newProps.term }
        ),
        cachedResult = Cache.get(cacheKey)

      // is calculation already cached? do not wait
      // first time do not wait
      if (cachedResult || !this.props.amount) {
        this.props.calculate(newProps.amount, newProps.term)
      } else {
        // wait 100 ms to calculate
        clearTimeout(this.changeTimeout)
        this.changeTimeout = setTimeout(() => {
          this.props.calculate(newProps.amount, newProps.term)
        }, 100)
      }
    }
  }

  render() {
    if (!this.props.amount || !this.props.term) {
      return <Loading />
    }

    return <Calculator
      amount={this.props.amount}
      term={this.props.term}
      config={this.props.config.payload}
      result={this.props.result.payload}
      change={(amount, term) => this.props.change(amount, term)}
    />
  }
}

const mapStateToProps = (state, props) => ({
  ...state.calculation
})

const mapDispatchToProps = (dispatch, props) => ({
  init: () => {
    dispatch(loadConfig())
      .then((config) => {
        dispatch(set({
          amount: config.amountInterval.defaultValue,
          term: config.termInterval.defaultValue
        }))
      })
  },
  change: (amount, term) => {
    dispatch(set({ amount, term }))
  },
  calculate: (amount, term) => {
    dispatch(calculate({ amount, term }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorContainer)
