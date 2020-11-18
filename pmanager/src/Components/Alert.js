import React from 'react'
import { useState } from 'react'
import Title from './KTitle'

const Alert = ({ title = "", message = "", visible, state = "error" }) => {
    return (
        <>{visible &&
            < div className="text-center py-4 lg:px-4" >
                <div className={`p-2 bg-${state == "error" ? 'red' : 'green'}-800 items-center text-${state == "error" ? 'red' : 'green'}-100 leading-none lg:rounded-full flex lg:inline-flex`} role="alert">
                    <span className={`flex rounded-full bg-${state == "error" ? 'red' : 'green'}-500 uppercase px-2 py-1 text-xs font-bold mr-3`} > {title}</span>
                    <span className="font-semibold mr-2 text-left flex-auto">{message}</span>
                </div>
            </div >}
        </>
    );

}
export default Alert