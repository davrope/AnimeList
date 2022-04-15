import {FETCH_ANIME_LIST, FETCH_ANIME, SET_FAVORITE, SET_LIKE, FETCH_MORE_ANIMES} from "../actions/types";
// import { FETCH_CHARACTER_LIST } from "../actions/types";

const initialState = []

// const initialState = {}

export default function foo(state= initialState, action){
    switch(action.type){
        case FETCH_MORE_ANIMES:
            // return [...state, action.payload]
            // return {
            //     ...state,
            //     data:[
            //         ...state.animes.data,
            //         {
            //             // data: action.payload
            //             data: action.payload.data
            //         }
            //     ]
            // }
            // return {animes:[...state, action.payload]}
            // return [...state, ...action.payload]
            // return [...state.animes.data, action.payload ]

            return action.payload
        case FETCH_ANIME_LIST:
            // return [...action.payload]
            return action.payload
            // return [...state, action.payload];
        case FETCH_ANIME:
            return action.payload;
        case SET_FAVORITE:
            return action.payload;
        case SET_LIKE:
            return action.payload;
        // case FETCH_CHARACTER_LIST:
        //     return action.payload;
        default:
            return [...state]
    }
}
