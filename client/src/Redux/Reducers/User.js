import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_REQUEST_SUCCESS,
    USER_REGISTER_REQUEST_FAIL,
    
} from '../Constants/User'

//user login reducer
export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_REQUEST_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_REQUEST_FAIL:
            return {loading: false, error: action.payload.error}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

//user register reducer
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_REQUEST_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_REQUEST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}