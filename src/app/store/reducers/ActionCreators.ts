import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import { IUser } from '../../models/IUser';
import { AppDispatch } from '../store';
import { userSlice } from './UseSlice';


// export const fetchUsers = () => async (dispatch: AppDispatch) => {
// 	try {
// 		dispatch(userSlice.actions.usersFetching());
// 		const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')

// 		dispatch(userSlice.actions.usersFetchingSuccess(response.data));
// 	} catch (e) {
// 		const err = e as AxiosError;

// 		dispatch(userSlice.actions.usersFetchingError(err.message));
// 	}
// }

export const fetchUsers = createAsyncThunk(
	'user/fetchUsers',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')

			return response.data
		} catch (error) {
			const err = error as AxiosError;

			return thunkAPI.rejectWithValue(err.message);
		}
	}
)