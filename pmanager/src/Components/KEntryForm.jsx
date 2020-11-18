import React from "react"
import KFormLayout from "./KFormLayout"
import KField from "./KField"

import SaveImg from "../Images/save.png"
import DeleteImg from "../Images/delete.png"

class KEntryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      AppName: "",
      UserName: "",
      Password: "",
    }
  }

  updateAppName = (value) => {
    this.setState({ AppName: value })
  }

  updateUserName = (value) => {
    this.setState({ UserName: value })
  }

  updatePassword = (value) => {
    this.setState({ Password: value })
  }

  render() {
    return (
      <div className="w-1/4 h-auto font-raleway flex flex-col justify-center items-center">
        <p className="font-bold text-ktitlecolor text-3xl pb-6">
          Información del elemento
        </p>
        <KFormLayout width="100%">
          <KField
            fieldname="Nombre"
            isEntry
            value={this.state.AppName}
            updateValue={this.updateAppName}
          />
          <KField
            fieldname="Usuario"
            isEntry
            value={this.state.UserName}
            updateValue={this.updateUserName}
          />
          <KField
            fieldname="Contraseña"
            isEntry
            isPassword
            value={this.state.Password}
            updateValue={this.updatePassword}
          />
        </KFormLayout>
        <div className="w-full h-auto mt-6 flex justify-between">
          <button
            className="w-20 h-15 bg-button flex justify-center items-center rounded-full"
            type="button"
          >
            <img src={SaveImg} alt="Save" />
          </button>
          <button
            className="w-20 h-15 bg-white border-solid border-button flex justify-center items-center rounded-full"
            type="button"
          >
            <img src={DeleteImg} alt="Save" />
          </button>
        </div>
      </div>
    )
  }
}

export default KEntryForm
