// action types
export const CHANGE_USER_INFO = "CHANGE_USER_INFO"
export const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE"
export const UPDATE_START_END_PAGE = "UPDATE_START_END_PAGE"
export const CHANGE_USER_GENDER = "CHANGE_USER_GENDER"
export const CHANGE_IS_LOGIN = "CHANGE_IS_LOGIN"
export const CHANGE_USER_PW = "CHANGE_USER_PW"
export const CHANGE_SEARCH_WORD = "CHANGE_SEARCH_WORD"
export const CHANGE_SELECT_WORD = "CHANGE_SELECT_WORD"
export const CHANGE_CUR_LOCATION = "CHANGE_CUR_LOCATION"

export const UPDATE_WEATHERINFO = "UPDATE_WEATHERINFO"
export const UPDATE_USER_POST = "UPDATE_USER_POST"
export const UPDATE_POST_ID = "UPDATE_POST_ID"

// actions creator functions
export const changeUser = (userinfo) => {
    return {
        type: CHANGE_USER_INFO,
        payload: { 
            ...userinfo,
        },
    }
}
export const updateCurrentPage = (current) => {
    return {
        type: UPDATE_CURRENT_PAGE,
        payload: {
            current,
        },
    }
}
export const updateStartEndPage = (start, end) => {
    return {
        type: UPDATE_START_END_PAGE,
        payload: {
            start,
            end,
        },
    }
}

export const changeGender = (usergender) => {
    return {
        type: CHANGE_USER_GENDER,
        payload: usergender,
    }
}
export const changeSearchword = (searchWord) => {
    return {
        type: CHANGE_SEARCH_WORD,
        payload: searchWord,
    }
}
export const changeSelectword = (selectWord) => {
    return {
        type: CHANGE_SELECT_WORD,
        payload: selectWord,
    }
}
export const changeIsLogin = (trueOrFalse) => {
    return {
        type: CHANGE_IS_LOGIN,
        payload: trueOrFalse,
    }
}

export const changeUserPw = (pw) => {
    return {
        type: CHANGE_USER_PW,
        payload: pw,
    }
}

export const changeCurLocation = (lat, lon) => {
    return {
        type: CHANGE_CUR_LOCATION,
        payload: { lat: lat, lon: lon },
    }
}

//test 
export const updateWeatherInfo = (data) => {
    return {
        type: UPDATE_WEATHERINFO,
        payload: {
           data: data
        }
    }
}


export const userPosts = (postinfo) => {
    return {
        type: UPDATE_USER_POST,
        payload: {
           postinfo: postinfo,
        }
    }
}

export const updatePostId = (pageId) => {
    return {
        type: UPDATE_POST_ID,
        payload: pageId
    }
}