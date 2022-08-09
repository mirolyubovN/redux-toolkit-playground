import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { postAPI } from '../services/PostService';
import userReducer from './reducers/UseSlice';

const rootReducer = combineReducers({
	userReducer,
	[postAPI.reducerPath]: postAPI.reducer
})

export const setupStore = () => configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postAPI.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
