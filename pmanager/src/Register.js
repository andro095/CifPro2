import React from "react"
import axios from 'axios'
import { useState, useEffect } from "react"
import { apiUrl } from './Constants'
import Alert from './Components/Alert'
const Register = (props) => {
    const [phone, setPhone] = useState("31652756")
    const [username, setUsername] = useState("lolos1998")
    const [email, setEmail] = useState("augusto@gmail.com")
    const [name, setName] = useState("augusto")


    const [password, setPassword] = useState("123456")
    const [confirmPassword, setConfirmPassword] = useState("123456")
    const [alert, setAlert] = useState({ visible: false, message: "Credenciales invalidas", title: "error" })
    let phoneId
    useEffect(() => {

        if (localStorage.getItem("token") && localStorage.getItem("token") != "undefined") {
            props.history.push('/keychain')
        }
    }, [])

    const register = () => {
        if ([email, password, name, phone, username].some((i) => i == "")) {
            setAlert({ ...alert, visible: true, message: "Debe de llenar todos los campos", title: "error" })
            setTimeout(() => setAlert({ ...alert, visible: false }), 2000)
            return
        }
        if (confirmPassword != password) {
            setAlert({ ...alert, visible: true, message: "Las contraseñas no coinciden", title: "error" })
            setTimeout(() => setAlert({ ...alert, visible: false }), 2000)
            return
        }

        axios.post(`${apiUrl}/register/`,
            {
                "username": username,
                "password": password,
                "phone_number": phone,
                "email": email,
                "first_name": name
            }
        )
            .then(response => {
                props.history.push('/login')
            })
            .catch(error => {
                if (error.response.data.errorMessage) {
                    setAlert({ ...alert, visible: true, message: error.response.data.errorMessage, title: "error" })
                } else {
                    setAlert({ ...alert, visible: true, message: "No se pudo registrar", title: "error" })
                }

                setTimeout(() => setAlert({ ...alert, visible: false }), 2000)
            })
    }



    return (
        <div className="min-h-full">
            <p className="text-4xl  font-mono text-orange-100 my-24">Keychain App</p>
            <div className="w-full max-w-lg rounded overflow-hidden shadow-lg p-4 bg-white">
                <Alert {...alert} />
                <form className="">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Nombre
                        </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Número de telefono
                        </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                Email
                        </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
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
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500  font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                Confirmar Constraseña
                        </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-password" type="password" placeholder="**********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-2/4">
                            <button
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => register()}>
                                Registrarse
                        </button>
                        </div>
                        <div className="md:w-2/4">
                            <button
                                onClick={
                                    () => {
                                        props.history.push("/login")
                                    }
                                }
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Iniciar sesión
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register
