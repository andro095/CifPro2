import React from 'react'
import { useState, useEffect } from 'react'
import { create, get, update } from './Constants'
import { Trash, Pencil, Logout } from "heroicons-react";
import OTPModal from './OTPModal'
import NewAppModal from './NewAppModal'
import Spinner from './Components/Spinner'
import FloatingButton from './Components/FloatingButton'
const Home = ({ history }) => {
    const [newPassord, setNewPassord] = useState("")
    const [currentApp, setCurrentApp] = useState({})
    const [otpEdit, setOtpEdit] = useState(false)
    const [otpDelete, setOtpDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [invalidOtp, setInvalidOtp] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [showErrorToast, setShowErrorToast] = useState(false)
    const [apps, setApps] = useState([])
    const [newName, setNewName] = useState("")
    const [createPassword, setCreatePassword] = useState("")
    const [fetching, setFetching] = useState(true)
    useEffect(() => {
        console.log("ehre", localStorage.getItem("token"))
        get("keychain/app", (response) => {
            setFetching(false)
            setApps(response.data)
        })
    }, [])

    const timedToast = () => {
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 2300);
    }
    const timedErrorToast = () => {
        setShowErrorToast(true)
        setTimeout(() => {
            setShowErrorToast(false)
        }, 2300);
    }
    const timedInvalidOtp = () => {
        setInvalidOtp(true)
        setTimeout(() => {
            setInvalidOtp(false)
        }, 2300);
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("phone")
        history.push('/login')
    }

    const verifyOtp = (callback) => {
        setIsLoading(true)
        get(`keychain/otp/${localStorage.getItem("phone")}/`, (response) => {
            callback(true)
            setIsLoading(false)
        }, () => { setIsLoading(false) })
    }
    const updateApp = (otp, setOtp) => {
        setIsEditing(true)
        update({ path: `keychain/app/${currentApp.id}/reset/`, data: { otp: otp, password: newPassord } }, (response) => {
            if (response.data.error) {
                setIsEditing(false)
                setOtpEdit(false)
                timedInvalidOtp()
                return
            }
            setApps(apps.map(app => {
                if (app.id == currentApp.id) {
                    app.password = newPassord
                }
                return app
            }))
            setOtpEdit(false)
            setCurrentApp({})
            setNewPassord("")
            setOtp("")
            setIsEditing(false)
            timedToast()
        }, () => {
            setIsEditing(false)
        })
    }

    const deleteApp = (otp, setOtp) => {
        setIsDeleting(true)
        create({ path: `keychain/app/${currentApp.id}/delete/`, data: { otp: otp } }, (response) => {
            if (response.data.error) {
                setIsDeleting(false)
                setOtpDelete(false)
                timedInvalidOtp()
                return
            }
            setApps(apps.filter(app => app.id !== currentApp.id))
            setOtpDelete(false)
            setCurrentApp({})
            setOtp("")
            setIsDeleting(false)
            timedToast()
        }, () => {
            setIsDeleting(false)
        })
    }

    const addApp = (otp, setOtp, errorMessage) => {
        if (newName == "" || createPassword == "") {
            errorMessage(undefined)
            timedErrorToast()
            return
        }
        create({ path: `keychain/app/create/`, data: { password: createPassword, name: newName } }, () => {
            setApps([...apps, { password: createPassword, name: newName, id: apps[apps.length - 1].id + 1 }])
            console.log({ password: createPassword, name: newName, id: apps[apps.length - 1].id + 1 })
            setNewName("")
            setCreatePassword("")
            setIsCreating(false)
            timedToast()
        }, (error) => {
            if (typeof error.response.data == "string") {
                errorMessage(error.response.data)
            } else {
                errorMessage("Ha ocurrido un error al crear la app")
            }

            timedErrorToast()

        })
    }
    return (
        <>
            {showToast && <div class="alert-toast fixed top-0 right-0 m-8 w-5/6 md:w-full max-w-sm">

                <label class="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-14 rounded shadow-lg text-white" title="close" for="footertoast">
                    La operacion se realizo con exito
                </label>
            </div>}

            {invalidOtp && <div class="alert-toast fixed top-0 right-0 m-8 w-5/6 md:w-full max-w-sm">

                <label class="close cursor-pointer flex items-start justify-between w-full p-2 bg-red-500 h-14 rounded shadow-lg text-white" title="close" for="footertoast">
                    OTP INVALIDO
</label>
            </div>}

            <NewAppModal visible={isCreating}
                showErrorToast={showErrorToast}
                closeCallback={() => {
                    setIsCreating()
                    setNewName("")
                    setCreatePassword("")
                }}
                callback={addApp}>
                <>
                    <div className="col-start-2 col-span-4 flex flex-wrap">
                        <label className="text-center w-full block text-gray-500 font-bold  mb-1 mb-0 pr-4" htmlFor="inline-full-name">
                            Nueva contraseña
                        </label>
                        <input
                            className="w-full  bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-password" placeholder="Ingresa el nombre de la app"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)} />
                    </div>
                    <div className="col-start-2 col-span-4 flex flex-wrap">
                        <label className="text-center w-full block text-gray-500 font-bold  mb-1 mb-0 pr-4" htmlFor="inline-full-name">
                            Nueva contraseña
                        </label>
                        <input
                            className="w-full  bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-password" placeholder="Ingresa la nueva contraseña aca"
                            value={createPassword}
                            onChange={(e) => setCreatePassword(e.target.value)} />
                    </div>
                </>
            </NewAppModal>
            <OTPModal visible={otpEdit} closeCallback={setOtpEdit} callback={(otp, setOtp) => { updateApp(otp, setOtp) }} isLoading={isEditing} >
                <div className="col-start-2 col-span-4 flex flex-wrap">
                    <label className="text-center w-full block text-gray-500 font-bold  mb-1 mb-0 pr-4" htmlFor="inline-full-name">
                        Nueva contraseña
                        </label>
                    <input
                        className="w-full  bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-password" placeholder="Ingresa la nueva contraseña axa"
                        value={newPassord}
                        onChange={(e) => setNewPassord(e.target.value)} />
                </div>
            </OTPModal>
            <OTPModal visible={otpDelete} closeCallback={setOtpDelete} callback={(otp, setOtp) => { deleteApp(otp, setOtp) }} isLoading={isDeleting} />
            <button className="absolute top-0 right-0 text-white pointer" onClick={() => logout()} >
                <Logout color="red" className="mx-3" />
            </button>
            <div className="my-2">
                <div className="relative px-32">
                    <div className="absolute bottom-0 left-0 text-white pointer" >
                        <FloatingButton
                            callback={() => setIsCreating(true)} />
                    </div>
                    <p className="text-4xl  font-mono text-orange-100">Keychain App</p>


                </div>
            </div>
            <div className="w-2/3 mx-auto">
                <div className="bg-white shadow-md rounded my-6">
                    <table className="text-left w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Aplicación</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Password</th>
                                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fetching &&
                                [1, 2, 3].map((id) =>
                                    <tr key={id + "lolo"} className="hover:bg-grey-lighter animate-pulse">
                                        <td className="space-y-2  p-4">
                                            <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-400 rounded"></div>
                                                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                                <div className="h-4 bg-gray-400 rounded"></div>
                                            </div>
                                        </td>
                                        <td className="space-y-2  p-4">
                                            <div className="h-4 bg-gray-400 rounded"></div>
                                            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                            <div className="h-4 bg-gray-400 rounded"></div>
                                        </td>
                                        <td className="space-y-2  p-4">
                                            <div className="h-4 bg-gray-400 rounded"></div>
                                            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                            <div className="h-4 bg-gray-400 rounded"></div>
                                        </td>
                                    </tr>)
                            }
                            {apps.map(app =>
                                <tr key={app.id} className="hover:bg-grey-lighter">
                                    <td className="py-4 px-6 border-b border-grey-light">{app.name}</td>
                                    <td className="py-4 px-6 border-b border-grey-light"><span className="blurry-text">{app.password}</span></td>
                                    <td className="py-4 px-6 border-b border-grey-light">
                                        <div className="flex items-center space-x-2">
                                            <Trash color="red" className="pointer" onClick={() => {
                                                if (!isLoading) {
                                                    verifyOtp(setOtpDelete)
                                                    setCurrentApp(app)
                                                }
                                            }} />
                                            <Pencil className="pointer" onClick={() => {
                                                if (!isLoading) {
                                                    verifyOtp(setOtpEdit)
                                                    setCurrentApp(app)
                                                }
                                            }} />
                                            <Spinner isLoading={isLoading} />
                                        </div>
                                    </td>
                                </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home
