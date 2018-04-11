import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
  render() {
    const style = this.props.hide ? { display: 'none' } : {}

    return <div style={style}>{this.props.text}</div>
  }
}

Loading.defaultProps = {
  text: 'loading...'
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  hide: PropTypes.bool
}
