import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'

import Select from '../components/Select'

export default class SliderSelectPair extends React.Component {

  render() {
    return (
      <div>
        <strong>{this.props.label}:</strong>

        <Slider
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={(newValue) => { this.handleChange(newValue) }}
        />

        <Select
          value={this.props.value}
          options={this.getSelectOptions()}
          select={(newValue) => { this.handleChange(newValue) }}
        />
      </div>
    )
  }

  handleChange(newValue) {
    const intNewValue = parseInt(newValue, 10)

    this.props.onChange(intNewValue)
  }

  getSelectOptions() {
    const
      options = []

    for (let i = this.props.min; i <= this.props.max; i += this.props.step) {
      options.push(i)
    }

    return options
  }
}

SliderSelectPair.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
