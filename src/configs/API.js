import axios from "axios"

const HOST = "https://chinhtran18.pythonanywhere.com"

export const endpoints = {
    "login": "/login/",
    "register": "/register/",
    'forget_password': '/users/forget_password/',
    'current_user': '/users/current-user/',
    'search': '/users/search/',
    'add_posts': '/users/posts/',
    'add_survey': 'users/surveys/',
    'retrieve_user': (userID) => `/users/${userID}/`, 
    'list_posts': '/posts/', 
    'list_random_posts': '/posts/list-random-posts/',
    'reacts': (postID) => `/posts/${postID}/reacts/`,
    'list_surveys': '/surveys/',
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