import {combineReducers} from 'redux';
import animesReducer from './animesReducer';
import charactersReducer from './charactersReducer';


export default combineReducers({
    animes: animesReducer,
    characters: charactersReducer
})