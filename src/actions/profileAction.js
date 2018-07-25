import React from 'react';
import { UPDATE_PROFILE } from './types';

export const updateProfile= ( update )=> {
    return {
        type: UPDATE_PROFILE,
        payload: {...update }
    }
};