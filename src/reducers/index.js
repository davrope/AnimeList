import {combineReducers} from 'redux';
import animesReducer from './animesReducer'


export default combineReducers({
    animes: animesReducer
})