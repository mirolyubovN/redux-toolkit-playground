import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks/redux';
import { fetchUsers } from './app/store/reducers/ActionCreators';

function App() {
	const dispatch = useAppDispatch();
	const {error, isLoading, users} = useAppSelector(state => state.userReducer);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [])

	return (
		<div className='text-center h-screen'>
			{isLoading && <h1 className='text-center font-bold'>Loading...</h1>}
			{error && <h1 className='text-center font-bold'>Error: {error}</h1>}
			{users &&
				<ul className='list-none text-center pt-10 mx-auto h-screen'>
				{
					users.map(user => (
						<li key={user.id} className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors flex flex-col'>
							<span className='font-bold mr-1'>Name: {user.name}</span>
							<span className='font-bold mr-1'>Id: {user.id}</span>
							<span className='font-bold mr-1'>Email: {user.email}</span>
						</li>
					))
				}
				</ul>
			}
		</div>
	);
}

export default App;
