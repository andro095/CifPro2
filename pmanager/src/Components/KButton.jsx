import React from "react"
import PropTypes from "prop-types"

class KButton extends React.Component {
  handleClick = () => {
    this.props.func()
  }

  render() {
    return (
      <input
        type="submit"
        value={this.props.text}
        onClick={this.handleClick}
        className="rounded-full my-3 w-auto font-raleway font-normal text-2xl px-6 bg-button hover:bg-indigo-700 text-white outline-none"
      />
    )
  }
}

KButton.propTypes = {
  text: PropTypes.string,
  func: PropTypes.func,
}

KButton.defaultProps = {
  text: "Prueba",
  func: () => {},
}

export default KButton
