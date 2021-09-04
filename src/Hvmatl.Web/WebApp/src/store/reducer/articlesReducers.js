import * as actionType from '../actionType'

export const createRepoReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.CREATE_REPO_REQUEST:
            return { loading: true }

        case actionType.CREATE_REPO_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                success: true
            }
        case actionType.CREATE_REPO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionType.CREATE_REPO_RESET:
            return {}
        default:
            return state;
    }
}

export const repoDeletedReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.DELETE_REPO_REQUEST:
            return { loading: true }
        case actionType.DELETE_REPO_SUCCESS:
            return { loading: false, success: true }
        case actionType.DELETE_REPO_FAIL:
            return { loading: false, error: action.payload }
        case actionType.DELETE_REPO_RESET:
            return {}
        default:
            return state;
    }
}

export const repoContentReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.REPO_CONTENT_REQUEST:
            return { loading: true }
        case actionType.REPO_CONTENT_SUCCESS:
            return { loading: false, success: true, repo: action.payload }
        case actionType.REPO_CONTENT_FAIL:
            return { loading: false, error: action.payload }
        case actionType.REPO_CONTENT_RESET:
            return {}
        default:
            return state;
    }
}

export const repoUpdatedReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.SAVE_REPO_REQUEST:
            return { loading: true }
        case actionType.SAVE_REPO_SUCCESS:
            return {
                loading: false,
                success: true,
                repo: action.payload,
            }
        case actionType.SAVE_REPO_FAIL:
            return { loading: false, error: action.payload }
        case actionType.SAVE_REPO_RESET:
            return {}
        default:
            return state;
    }
}

export const repoPostedReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.POST_REPO_REQUEST:
            return { loading: true }
        case actionType.POST_REPO_SUCCESS:
            return {
                loading: false,
                success: true,
                repo: action.payload,
            }
        case actionType.POST_REPO_FAIL:
            return { loading: false, error: action.payload }
        case actionType.POST_REPO_RESET:
            return {}
        default:
            return state;
    }
}



export const cloudImageReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.IMAGE_UPLOAD_REQUEST:
            return { loading: true }
        case actionType.IMAGE_UPLOAD_SUCCESS:
            return { loading: false, imageUrl: action.payload, success: true }
        case actionType.IMAGE_UPLOAD_FAIL:
            return { loading: false, error: action.payload }
        case actionType.IMAGE_UPLOAD_RESET:
            return {}
        default:
            return state;
    }
}

export const repoListReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.REPO_LIST_REQUEST:
            return { loading: true }
        case actionType.REPO_LIST_SUCCESS:
            return { loading: false, data: action.payload }
        case actionType.REPO_LIST_FAIL:
            return { loading: false, error: action.payload }
        case actionType.REPO_LIST_RESET:
            return {}
        default:
            return state;
    }
}