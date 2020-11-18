//Constants file for this dummy

import axios from "axios"

export const apiUrl = "https://9950146c9ef5.ngrok.io/api"

export const create = ({ path, data }, onSuccess = () => { }, onError = () => { }) => {
    axios.request({
        url: `${apiUrl}/${path}`,
        method: 'post',
        data: data,
        headers: {
            "Authorization": `JWT ${localStorage.getItem("token")}`
        }
    }).then((response) => {
        onSuccess(response)
    })
        .catch(error => {
            if (error.response != undefined && error.response.status == 401) {
                localStorage.removeItem("token")
                localStorage.removeItem("phone")
                window.location.replace("/login")
            }
            else {
                onError(error)
            }
        })
}

export const get = (path, onSuccess = () => { }, onError = () => { }) => {
    axios.request({
        url: `${apiUrl}/${path}`,
        method: 'get',
        headers: {
            "Authorization": `JWT ${localStorage.getItem("token")}`
        }
    }).then((response) => {
        onSuccess(response)
    })
        .catch(error => {
            if (error.response != undefined && error.response.status == 401) {
                localStorage.removeItem("token")
                localStorage.removeItem("phone")
                window.location.replace("/login")
            }
            else {
                onError(error)
            }
        })
}
export const update = ({ path, data = {} }, onSuccess = () => { }, onError = () => { }) => {
    axios.request({
        url: `${apiUrl}/${path}`,
        data: data,
        method: 'put',
        headers: {
            "Authorization": `JWT ${localStorage.getItem("token")}`
        }
    }).then((response) => {
        onSuccess(response)
    })
        .catch(error => {
            if (error.response != undefined && error.response.status == 401) {
                localStorage.removeItem("token")
                localStorage.removeItem("phone")
                window.location.replace("/login")
            }
            else {
                onError(error)
            }
        })
}



