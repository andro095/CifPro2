import React from "react"
import PropTypes from "prop-types"

const KLabelField = ({ text }) => {
  return (
    <p className="text-ktitlecolor font-raleway text-3xl text-center h-auto w-auto font-normal">
      {text}
    </p>
  )
}

KLabelField.propTypes = {
  text: PropTypes.string,
}

KLabelField.defaultProps = {
  text: "Prueba",
}

export default KLabelField
