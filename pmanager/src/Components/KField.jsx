import React from "react"
import PropTypes from "prop-types"
import KLabelField from "./KLabelField"
import KInputField from "./KInputField"

const KField = ({ fieldname, isEntry, isPassword, value, updateValue }) => {
  return (
    <div
      className={
        isEntry
          ? "flex flex-col my-3 w-full h-auto items-start"
          : "flex flex-col my-3 w-full h-auto"
      }
    >
      <KLabelField text={fieldname} />
      <KInputField
        isEntry={isEntry}
        isPassword={isPassword}
        value={value}
        updateValue={updateValue}
      />
    </div>
  )
}

KField.propTypes = {
  fieldname: PropTypes.string,
  isEntry: PropTypes.bool,
  isPassword: PropTypes.bool,
  value: PropTypes.string,
  updateValue: PropTypes.func,
}

KField.defaultProps = {
  fieldname: "Prueba",
  isEntry: false,
  isPassword: false,
  value: "",
  updateValue: () => {},
}

export default KField
