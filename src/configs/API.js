import axios from "axios"

const HOST = "https://chinhtran18.pythonanywhere.com"

export const endpoints = {
    "login": "/login/",
    "register": "/register/",
    'forget_password': '/users/forget_password/',
    'current-user': '/users/current-user/',
    'search': '/users/search/',
    'add-posts': '/users/posts/',
    'add-survey': 'users/surveys/',
    'retrieve-user': (userID) => `/users/${userID}/`, 
    'list-posts': '/posts/', 
    'list-random-posts': '/posts/list-random-posts/',
    'reacts': (postID) => `/posts/${postID}/reacts/`,
    'list-surveys': '/surveys/',
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