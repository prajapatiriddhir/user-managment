import { createStore, combineReducers } from 'redux';

import { UserReducer } from './reducer';

const rootReducer = combineReducers({
    userReducer: UserReducer
})

export const store = createStore(rootReducer);