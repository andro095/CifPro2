import React from "react"
import PropTypes from "prop-types"

import KeyImg from "../Images/key.png"
import KeyClearImg from "../Images/keyclear.png"

const Title = ({ isInMenu }) => {
  return (
    <div
      className="flex w-auto h-fit-content justify-center items-center font-bold font-raleway text-ktitle"
      style={{ color: isInMenu ? "#A3AEF7" : "#2A3475" }}
    >
      <p className="m-0 h-fit-content">KManager</p>
      <img src={isInMenu ? KeyClearImg : KeyImg} alt="Key" className="h-18" />
    </div>
  )
}

Title.propTypes = {
  isInMenu: PropTypes.bool,
}

Title.defaultProps = {
  isInMenu: false,
}

export default Title
