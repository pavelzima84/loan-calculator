/* eslint react/prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import { set, loadConfig, calculate } from '../actions/calculation'
import * as Cache from '../utils/cache'
import { createCancelToken } from '../utils/agent'
import Loading from '../components/Loading'
import Calculator from '../components/Calculator'

class CalculatorContainer extends React.Component {

  componentDidMount() {
    this.changeTimeout = null
    this.calculateCancelToken = null

    this.props.init()
  }

  componentWillUnmount() {
    this.clearTimeout()
    this.clearCalculationTimeout()
  }

  componentWillReceiveProps(newProps) {
    // show new data according to amount and term
    if (this.props.amount !== newProps.amount || this.props.term !== newProps.term) {
      const
        cacheKey = Cache.createKey(
          'CALCULATION/CALCULATE',
          { amount: newProps.amount, term: newProps.term }
        ),
        cachedResult = Cache.get(cacheKey)

      // is the calculation already cached? show data immediately!
      // is the first time? try to load daty immediately!
      if (cachedResult || !this.props.amount) {
        this.props.calculate(newProps.amount, newProps.term)
      } else {
        // cancel the previous try to calculate
        this.clearCalculationTimeout()
        // wait a moment (100 ms) to calculate
        this.changeTimeout = setTimeout(() => {
          // cancel the previous not finished request
          this.cancelCalculation()

          // create a new cancel token
          this.calculateCancelToken = createCancelToken()
          this.props.calculate(newProps.amount, newProps.term, this.calculateCancelToken.token)
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

  clearCalculationTimeout() {
    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout)
      this.changeTimeout = null
    }
  }

  cancelCalculation() {
    if (this.calculateCancelToken) {
      this.calculateCancelToken.cancel('Request canceled by calculator.')
      this.calculateCancelToken = null
    }
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
  calculate: (amount, term, cancelToken) => {
    dispatch(calculate({ amount, term }, { cancelToken }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorContainer)
