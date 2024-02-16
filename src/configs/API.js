import axios from "axios"

const HOST = "https://chinhtran18.pythonanywhere.com"

export const endpoints = {
    "login": "/login/",
    "register": "/register/",
    'forget_password': '/users/forget_password/',
    'current-user': '/users/current-user/'
}


export const authApi = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: HOST,
})