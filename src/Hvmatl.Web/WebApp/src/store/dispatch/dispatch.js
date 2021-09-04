import axios from 'axios';
import * as actionType from '../actionType';

//Auth dispatch
export const authenticate = (dispatch, credentials) => axios.post('https://hvmatl-backend.herokuapp.com/authentication', credentials)
    .then(res => dispatch({ type: actionType.AUTH, token: res.data.token }));

export const restoreToken = (dispatch, token) => dispatch({ type: actionType.AUTH, token: token })
//Get WeeklyNews
export const getWeeklyNews = (dispatch, from, to, token) => axios.get('https://hvmatl-backend.herokuapp.com/weeklyNews', {
    headers: {
        'Authorization': `Bearer ${token}`
    },
    params: {
        from: from,
        to: to
    }
}).then(res => dispatch({ type: actionType.GET_WEEKLY_NEWS, data: res.data }));

//Get Carousel Slides
export const getSlides = (dispatch, date, token) => axios.get('https://hvmatl-backend.herokuapp.com/carousel', {
    headers: {
        'Authorization': `Bearer ${token}`
    },
    params: {
        date: date
    }
}).then(res => dispatch({ type: actionType.GET_SLIDES, data: res.data }));

export const submitForm = (dispatch, formType, formData, token, callback) => axios.post('http://hvmatl-backend.herokuapp.com/allSoulsFeast', formData, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(res => {
    updateForm(dispatch, formType, {
        memberId: "",
        requestor: "",
        email: "",
        soulName: ""
    });
    callback({
        header: "Success",
        message: "Form submitted!!"
    })
}).catch(res => {
    updateForm(dispatch, formType, {
        memberId: "",
        requestor: "",
        email: "",
        soulName: ""
    });
    callback({
        header: "Failed",
        message: "Failed to submit!!"
    })
});

export const updateForm = (dispatch, formType, updateData) => dispatch({ type: actionType.UPDATE_FORM_DATA, formType: formType, updateData: updateData });


// ************************************** 

// Test Editor Dispatch

export const createNewRepo = async (dispatch, isLetters) => {
    dispatch({ type: actionType.CREATE_REPO_REQUEST })
    try {
        const { data } = await axios.post("http://localhost:5000/api/repos/new-repo", { isLetters }, {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
        })
        dispatch({ type: actionType.CREATE_REPO_SUCCESS, payload: data })

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.CREATE_REPO_FAIL, payload: message })
    }
}


export const deleteRepo = async (dispatch, repoId) => {
    dispatch({ type: actionType.DELETE_REPO_REQUEST })
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/repos/delete-repo/${repoId}`)
        dispatch({ type: actionType.DELETE_REPO_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.DELETE_REPO_FAIL, payload: message })
    }
}

export const getRepoContent = async (dispatch, repoId) => {
    dispatch({ type: actionType.REPO_CONTENT_REQUEST })
    try {
        const { data } = await axios.get(`http://localhost:5000/api/repos/${repoId}`)
        dispatch({ type: actionType.REPO_CONTENT_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.REPO_CONTENT_FAIL, payload: message })
    }
}

export const saveUpdateRepo = async (dispatch, article) => {
    dispatch({ type: actionType.SAVE_REPO_REQUEST })
    try {
        const { data } = await axios.put(`http://localhost:5000/api/repos/update-repo/${article._id}`, article, {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
        })
        dispatch({ type: actionType.SAVE_REPO_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.SAVE_REPO_FAIL, payload: message })
    }
}

export const getImageUrl = async (dispatch, imageReader) => {
    dispatch({ type: actionType.IMAGE_UPLOAD_REQUEST })
    try {
        const { data } = await axios.post('http://localhost:5000/api/cloudinary/upload-image', imageReader, {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        dispatch({ type: actionType.IMAGE_UPLOAD_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.IMAGE_UPLOAD_FAIL, payload: message })
    }
}

export const postRepo = async (dispatch, repo) => {
    dispatch({ type: actionType.POST_REPO_REQUEST })
    try {
        const { data } = await axios.put(`http://localhost:5000/api/repos/update-repo/${repo._id}`, { ...repo, isPublish: true }, {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        dispatch({ type: actionType.POST_REPO_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.POST_REPO_FAIL, payload: message })
    }
}

export const getRepoList = async (dispatch, cateId, headId) => {
    dispatch({ type: actionType.REPO_LIST_REQUEST })
    try {
        const { data } = await axios.get(`http://localhost:5000/api/repos/list-repos?isLetters=${cateId === 'letters' ? true : false}&isPublish=${headId === '/Drafts' ? false : true}`)
        dispatch({ type: actionType.REPO_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: actionType.REPO_LIST_FAIL, payload: message })
    }

}