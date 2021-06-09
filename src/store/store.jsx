import userReducer from '../slices/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, createStore } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({ user: userReducer })
)

const store = createStore(persistedReducer, applyMiddleware(thunk))

const persistor = persistStore(store)

export { persistor, store }
