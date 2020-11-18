import React from "react"
import PropTypes from "prop-types"

const KEntry = ({ isFocused, setFocus, EntryName }) => {
  return (
    <div
      className={
        isFocused
          ? "w-full bg-textFieldFocused hover:bg-button font-raleway flex flex-col justify-center outline-none items-center text-2xl font-bold text text-ktitlecolor"
          : "w-full hover:bg-indigo-200 font-raleway flex flex-col justify-center items-center outline-none text-2xl font-normal text-ktitlecolor"
      }
      onClick={setFocus}
      onKeyPress={() => {}}
      role="button"
      tabIndex="-1"
    >
      <p className="my-2">{EntryName}</p>
      <hr className="w-full border-t-4 border-myblue" />
    </div>
  )
}

KEntry.propTypes = {
  isFocused: PropTypes.bool,
  setFocus: PropTypes.func,
  EntryName: PropTypes.string,
}

KEntry.defaultProps = {
  isFocused: false,
  setFocus: () => {},
  EntryName: "Prueba",
}

export default KEntry
