import React from 'react'
import { Link } from 'react-router-3'

import CalculatorContainer from '../containers/CalculatorContainer'

export default class Page extends React.Component {

  render() {
    return (
      <div>
        <header>
          <h1><Link to="/">Loan Calculator</Link></h1>
        </header>

        <main className="container">
          <CalculatorContainer />
        </main>
      </div>
    )
  }
}
