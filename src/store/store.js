import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"
import { appReducer } from './reducers/app.reducer.js'
import {
    combineReducers,
    compose,
    legacy_createStore as createStore
} from "redux"


const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    appModule: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
