/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import PropTypes from "prop-types"

import CopyImg from "../Images/copy.png"
import DisplayImg from "../Images/display.png"
import UnDisplayImg from "../Images/invisible.png"

class KInputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      hidden: true,
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
    this.props.updateValue(event.target.value)
  }

  changeHideStatus = (value) => {
    this.setState({ hidden: value })
  }

  render() {
    return (
      <div className="flex w-full h-10">
        <input
          type={
            this.props.isPassword && this.state.hidden ? "password" : "text"
          }
          value={this.state.value}
          ref={(input) => (this.input = input)}
          onChange={this.handleChange}
          className="rounded-full outline-none border-solid border-2 border-myblue text-center flex-grow focus:bg-indigo-200 font-raleway font-normal text-2xl w-full"
        />
        {this.props.isEntry ? (
          <CopyToClipboard
            text={this.state.value}
            onCopy={() =>
              toast.info("Copiado al portapapeles 📋", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              })
            }
          >
            <img src={CopyImg} alt="Copy" className="ml-5" />
          </CopyToClipboard>
        ) : null}
        {this.props.isPassword && this.props.isEntry ? (
          <img
            src={this.state.hidden ? DisplayImg : UnDisplayImg}
            alt="Display"
            onClick={() => this.changeHideStatus(!this.state.hidden)}
            onKeyDown={() => {}}
            className="ml-5"
          />
        ) : null}
      </div>
    )
  }
}

KInputField.propTypes = {
  value: PropTypes.string,
  isPassword: PropTypes.bool,
  isEntry: PropTypes.bool,
  updateValue: PropTypes.func,
}

KInputField.defaultProps = {
  value: "",
  isPassword: true,
  isEntry: true,
  updateValue: () => {},
}

export default KInputField
