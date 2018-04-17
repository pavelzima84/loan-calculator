import React from 'react'
import PropTypes from 'prop-types'

export default class Select extends React.Component {

  render() {
    return (
      <select value={this.props.value} onChange={(e) => this.handleSelect(e)}>
        {this.props.options.map(this.renderOption, this)}
      </select>
    )
  }

  handleSelect(e) {
    let value = e.target.value

    this.props.select(value)
  }

  renderOption(value, index) {
    return <option value={value} key={value}>{value}</option>
  }
}

Select.propTypes = {
  value: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired
}
