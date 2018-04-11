import React from 'react'
import PropTypes from 'prop-types'

export default class CalculationTable extends React.Component {

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>monthlyPayment</th>
            <td>{this.props.monthlyPayment}</td>
          </tr>
          <tr>
            <th>term</th>
            <td>{this.props.term}</td>
          </tr>
          <tr>
            <th>totalCostOfCredit</th>
            <td>{this.props.totalCostOfCredit}</td>
          </tr>
          <tr>
            <th>totalPrincipal</th>
            <td>{this.props.totalPrincipal}</td>
          </tr>
          <tr>
            <th>totalRepayableAmount</th>
            <td>{this.props.totalRepayableAmount}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

CalculationTable.propTypes = {
  monthlyPayment: PropTypes.number,
  term: PropTypes.string,
  totalCostOfCredit: PropTypes.number,
  totalPrincipal: PropTypes.string,
  totalRepayableAmount: PropTypes.number
}
