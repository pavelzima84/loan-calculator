/* eslint react/prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import { loadConfig, calculate } from '../actions/calculation'
import Loading from '../components/Loading'
import Calculator from '../components/Calculator'

class CalculatorContainer extends React.Component {

  componentDidMount() {
    this.props.init()
  }

  render() {
    if (this.props.config.status !== 'done') {
      return <Loading />
    }

    return <Calculator
      amount={this.props.amount}
      term={this.props.term}
      config={this.props.config.payload}
      result={this.props.result.payload}
      calculate={(amount, term) => this.props.calculate(amount, term)}
    />
  }
}

const mapStateToProps = (state, props) => ({
  ...state.calculation
})

const mapDispatchToProps = (dispatch, props) => ({
  init: () => {
    dispatch(loadConfig())
      .then((result) => {
        dispatch(calculate({
          amount: result.amountInterval.defaultValue,
          term: result.termInterval.defaultValue
        }))
      })
  },
  calculate: (amount, term) => {
    dispatch(calculate({ amount, term }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorContainer)
