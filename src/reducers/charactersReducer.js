import {FETCH_CHARACTER_LIST} from "../actions/types";

const initialState = []

export default function foo(state= initialState, action){
    switch(action.type){
        case FETCH_CHARACTER_LIST:
            return [...state, action.payload]
        default:
            return [...state]
    }
}
