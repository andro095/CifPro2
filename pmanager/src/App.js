import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Route from "react-router-dom/Route"
import { ToastContainer } from "react-toastify"
// import Title from "./Components/KTitle"
// import KFormLayout from "./Components/KFormLayout"
// import KField from "./Components/KField"
// import KButton from "./Components/KButton"
// import KEntry from "./Components/KEntry"
// import KMenu from "./Components/KMenu"
// import KEntryForm from "./Components/KEntryForm"
import Login from './Login'
import Register from './Register'
import Home from './Home'

import "./Styles/output.css"
import "./Styles/styles.css"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [isEntryOne, setIsEntryOne] = React.useState(false)
  const [isEntryTwo, setIsEntryTwo] = React.useState(false)

  const ChangeFocus = (value) => {
    if (value === 1) {
      setIsEntryOne(true)
      setIsEntryTwo(false)
    } else {
      setIsEntryOne(false)
      setIsEntryTwo(true)
    }
  }

  return (
    <Router>
      <div className="flex flex-col items-center text-center h-full">
        <Route path="/" exact strict component={Login} />
        <Route path="/login" exact strict component={Login} />
        <Route path="/register" exact strict component={Register} />

        <Route path="/keychain" exact strict component={Home} />

        {/* <Route path="/test" exact strict>
          <KEntryForm />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
        </Route> */}
      </div>
    </Router>
  )
}

export default App
