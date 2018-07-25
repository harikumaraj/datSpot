import React from 'react';

import { UPDATE_PROFILE } from '../actions/types'

let initialState={
    fullName:"",
    username:"",
    email:"",
    relationshipStatus:"",
    preferredCity:"",
    musicType:[],
    somethingAboutYourself:"",
    jwtToken:"",
    profileImage:require("../assets/face.jpg"),
    login:false,
    musicSelectedList:[],
    cityList:[],
    dob:"",
    profileImageObject:{}
};

export default ( state=initialState, action )=> {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {...state, ...action.payload};
        default:
            return state;
    }
}
