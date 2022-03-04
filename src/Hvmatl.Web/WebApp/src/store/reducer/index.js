import carouselReducer from './carouselReducer';
import weeklyNewsReducer from './weeklyNewsReducer';
import authReducer from './authReducer';
import formReducer from "./formReducer";
import { accountReducer } from "./accountReducer";
import { cloudImageReducer, createRepoReducer, repoDeletedReducer, repoContentReducer, repoUpdatedReducer, repoListReducer, repoPostedReducer } from './articlesReducers';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    auth: authReducer,
    account: accountReducer,
    carousel: carouselReducer,
    weeklyNews: weeklyNewsReducer,
    form: formReducer,
    createRepo: createRepoReducer,
    repoDeleted: repoDeletedReducer,
    repoContent: repoContentReducer,
    cloudImage: cloudImageReducer,
    repoUpdated: repoUpdatedReducer,
    repoList: repoListReducer,
    repoPosted: repoPostedReducer,
})

export default reducers