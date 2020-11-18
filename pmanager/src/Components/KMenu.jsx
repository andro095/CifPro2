import React from "react"
import KTitle from "./KTitle"

import AddImg from "../Images/add.png"

class KMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <div className="bg-white shadow-form rounded-r-form overflow-hidden h-full w-1/4 flex flex-col">
        <div className="bg-ktitlecolor py-4 flex justify-center items-center">
          <KTitle isInMenu />
        </div>
        <div className="w-full h-auto flex flex-col items-center">
          <div className="flex w-5/6 my-6 h-10">
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              className="rounded-full outline-none border-solid border-2 border-myblue text-center flex-grow focus:bg-indigo-200 font-raleway font-normal text-2xl w-full"
            />
          </div>
          <hr className="w-full border-t-4 border-myblue" />
        </div>
        <div className="w-full flex flex-grow overflow-y-auto" />
        <hr className="w-full border-t-4 border-myblue" />
        <div className="w-full h-auto p-form">
          <button
            type="submit"
            className="flex justify-center items-center rounded-full bg-button w-full h-12"
            onClick={() => console.log("Holi")}
          >
            <img src={AddImg} alt="plus" />
          </button>
        </div>
      </div>
    )
  }
}

export default KMenu
