import {FETCH_EPISODES} from "../actions/types";

const initialState = []

export default function foo(state= initialState, action){
    switch(action.type){
        case FETCH_EPISODES:
            return action.payload
        default:
            return state
    }
}
