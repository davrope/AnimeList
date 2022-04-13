import {FETCH_ANIME_LIST, FETCH_ANIME, SET_FAVORITE, SET_LIKE} from "../actions/types";

const initialState = []

export default function foo(state= initialState, action){
    switch(action.type){
        case FETCH_ANIME_LIST:
            return action.payload;
        case FETCH_ANIME:
            return action.payload;
        case SET_FAVORITE:
            return action.payload;
        case SET_LIKE:
            return action.payload;
        default:
            return [...state]
    }
}
