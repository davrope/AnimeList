import {combineReducers} from 'redux';
import animesReducer from './animesReducer';
import charactersReducer from './charactersReducer';
import episodesReducer from './episodesReducer'

export default combineReducers({
    animes: animesReducer,
    characters: charactersReducer,
    episodes : episodesReducer
})