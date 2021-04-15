import {
    GET_COURSES,
    GET_COURSE,
    SET_LOADING,
    POST_COURSE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_COURSES:
            return {
                ...state,
                courses: action.payload,
                loading: false
            };
        case GET_COURSE:
            return {
                ...state,
                course: action.payload,
                loading: false
            };
        case POST_COURSE:
            return {
                ...state,
                courses: action.payload,
                loading: false
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};
