import * as actionType from '../actionType'
import { combineReducers } from 'redux';

export const createAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.CREATE_ACCOUNT_PENDING:
            return { loading: true }

        case actionType.CREATE_ACCOUNT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                success: true
            }
        case actionType.CREATE_ACCOUNT_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case actionType.CREATE_ACCOUNT_IDLE:
            return {}
        default:
            return state;
    }
}

export const readAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.READ_ACCOUNT_PENDING:
            return { loading: true }

        case actionType.READ_ACCOUNT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                success: true
            }
        case actionType.READ_ACCOUNT_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case actionType.READ_ACCOUNT_IDLE:
            return {}
        default:
            return state;
    }
}

export const updateAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.UPDATE_ACCOUNT_PENDING:
            return { loading: true }

        case actionType.UPDATE_ACCOUNT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                success: true
            }
        case actionType.UPDATE_ACCOUNT_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case actionType.UPDATE_ACCOUNT_IDLE:
            return {}
        default:
            return state;
    }
}

export const deleteAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.DELETE_ACCOUNT_PENDING:
            return { loading: true }

        case actionType.DELETE_ACCOUNT_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                success: true
            }
        case actionType.DELETE_ACCOUNT_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case actionType.DELETE_ACCOUNT_IDLE:
            return {}
        default:
            return state;
    }
}

export const accountReducer = combineReducers({
    list : readAccountReducer,
    created : createAccountReducer,
    deleted : deleteAccountReducer,
    updated : updateAccountReducer
})

