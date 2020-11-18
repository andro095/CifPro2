import React, { useState } from 'react'
import Modal from './Components/Modal'
import Spinner from './Components/Spinner'
const NewAppModal = ({ visible, callback, closeCallback, showErrorToast, isLoading = false, ...props }) => {
    const [otp, setOtp] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)
    return (<>{visible && <Modal >
        {showErrorToast && <div class="alert-toast fixed top-0 right-0 m-8 w-5/6 md:w-full max-w-sm">

            <label class="close cursor-pointer flex items-start justify-between w-full p-2 bg-red-500 h-14 rounded shadow-lg text-white" title="close" for="footertoast">
                {errorMessage ?? 'Tiene que llenar todos los campos'}
            </label>
        </div>}
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">

                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Crea una nueva aplicación</h3>
                    <div className="mt-2">
                        <p className="text-sm leading-5 text-gray-500">

                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-6 gap-4">

            {props.children}
            {/* <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded col-start-2 col-span-4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password" placeholder="Ingresa el codigo aca"
                value={otp}
                onChange={(e) => setOtp(e.target.value)} /> */}
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => { callback(otp, setOtp, setErrorMessage) }}>
                    <Spinner isLoading={isLoading} />
                    Aceptar
                </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => {
                        closeCallback(false)
                        setOtp("")
                    }}>
                    Cancelar
            </button>
            </span>
        </div>
    </Modal>}</>)
}

export default NewAppModal

