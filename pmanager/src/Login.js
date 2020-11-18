import React from "react"
import axios from 'axios'
import { useState, useEffect } from "react"
import { apiUrl } from './Constants'
import Alert from './Components/Alert'
const Login = (props) => {
    const [twoStep, setTwoState] = useState(false)
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [otp, setOTP] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState({ visible: false, message: "Credenciales invalidas", title: "error" })
    let phoneId
    useEffect(() => {

        if (localStorage.getItem("token") && localStorage.getItem("token") != "undefined") {
            props.history.push('/keychain')
        }
    }, [])
    const validateUser = () => {
        axios.post(`${apiUrl}/auth/verify/`, { "username": username, "password": password })
            .then(response => {
                setPhone(response.data)
                phoneId = response.data
                setTwoState(true)
                getOtp(phoneId)
            })
            .catch(error => {
                setAlert({ ...alert, visible: true, message: "Credenciales invalidas", title: "error" })
                setTimeout(() => setAlert({ ...alert, visible: false }), 2000)
            })
    }

    const login = () => {
        axios.post(`${apiUrl}/login/`, { "username": username, "password": password, "phone_pk": phone, "otp": otp })
            .then(response => {
                if (response.data.error) {
                    setAlert({ ...alert, visible: true, message: "OTP invalido", title: "error" })
                    setTimeout(() => setAlert({ ...alert, visible: false }), 2000)
                } else {
                    props.history.push('/keychain')
                    localStorage.setItem("phone", phone)
                    localStorage.setItem("token", response.data.token)
                }

            })
            .catch(error => {
                setAlert({ ...alert, visible: true, message: "OTP invalido", title: "error" })
                setTimeout(() => setAlert({ ...alert, visible: false }), 2000)
            })
    }

    const getOtp = (phoneId) => {
        axios.get(`${apiUrl}/auth/otp/${phoneId}`)
            .then(response => {
                console.log("here", response)
            })
            .catch(error => {
                setAlert({ ...alert, visible: true, message: "Error al enviar el codigo OTP", title: "error" })
                setTimeout(() => setAlert({ ...alert, visible: false }), 2000)
            })
    }

    return (
        <div className="min-h-full">
            <p className="text-4xl  font-mono text-orange-100 my-24">Keychain App</p>
            <div className="w-full max-w-lg rounded overflow-hidden shadow-lg p-4 bg-white">
                <Alert {...alert} />
                {!twoStep && <form className="">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Usuario
                        </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500  font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                Constraseña
                        </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-password" type="password" placeholder="**********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-2/4">
                            <button
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => validateUser()}>
                                Iniciar sesión
                        </button>
                        </div>
                        <div className="md:w-2/4">
                            <button
                                onClick={() => {
                                    props.history.push("/register")
                                }}
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Registrarse
                        </button>
                        </div>
                    </div>
                </form>
                }
                {twoStep && <form className="">
                    <div className="md:flex flex-wrap md:items-center mb-6">
                        <div className="md:w-3/3 text-md my-4 text-gray-400">
                            A continuación se te habra enviado un codigo a tu numero de telefono ingresalo abajo.
                        </div>
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                OTP
                        </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)} />
                        </div>
                    </div>

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3">
                            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                                onClick={() => getOtp(phone)}>
                                Reenviar
                        </button>
                        </div>
                        <div className="md:w-1/3">
                            <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                                onClick={() => login()}>
                                Continuar
                        </button>
                        </div>
                        <div className="md:w-1/3">
                            <button className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                                onClick={() => { setTwoState(false) }}>
                                Regresar
                        </button>
                        </div>
                    </div>
                </form>
                }
            </div>
        </div>
    );
}

export default Login
