/* eslint react/prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'

import { loadConfig } from '../actions/config'
import { calculate } from '../actions/calculation'
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
      config={this.props.config.payload}
      calculate={(amount, term) => this.props.calculate(amount, term)}
      calculation={this.props.calculation}
    />
  }
}

const mapStateToProps = (state, props) => {
  return {
    config: state.config,
    calculation: state.calculation
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  init: () => {
    dispatch(loadConfig())
      .then((result) => {
          dispatch(calculate({
            amount: result.payload.amountInterval.defaultValue,
            term: result.payload.termInterval.defaultValue
          }))
        })
  },
  calculate: (amount, term) => {
    dispatch(calculate({ amount, term }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorContainer)
