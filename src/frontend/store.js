import thunk from 'redux-thunk'
import {buildReducerMap, setStore} from 'redux-model-utils'
import {applyMiddleware, createStore, combineReducers} from 'redux'

import models from 'models'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const allReducers = buildReducerMap(models)
const reducer = combineReducers(allReducers)
const store = createStoreWithMiddleware(reducer)

setStore(store)

export default store
