/* eslint-disable react/forbid-prop-types */
import React from "react"
import PropTypes from "prop-types"

class KFormLayout extends React.PureComponent {
  render() {
    return (
      <div
        className="shadow-form bg-white px-form py-4 rounded-form flex flex-col items-center"
        style={{ width: this.props.width }}
      >
        {this.props.children}
      </div>
    )
  }
}

KFormLayout.propTypes = {
  children: PropTypes.array,
  width: PropTypes.string,
}

KFormLayout.defaultProps = {
  children: <div className="w-48" />,
  width: "20%",
}

export default KFormLayout
