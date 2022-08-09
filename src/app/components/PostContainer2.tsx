import React from 'react'
import { postAPI } from '../services/PostService';

export const PostContainer2 = () => {
	const {isError, data, isLoading} = postAPI.useFetchAllUsersQuery(15);

	return (
		<div>
			{isLoading && <h1 className='text-center font-bold'>Loading...</h1>}
			{isError && <h1 className='text-center font-bold'>Something went wrong</h1>}
			{data &&
				<ul className='list-none text-center pt-10 mx-auto'>
				{
					data.map(post => (
						<li key={post.id} className='py-2 px-4 my-2 flex justify-between items-center'>
							<span className='font-bold mr-1 w-1/4'>Id: {post.id}</span>
							<span className='font-bold mr-1 w-1/4'>Title: {post.title}</span>
							<span className='font-bold mr-1 w-1/4'>Body: {post.body}</span>
						</li>
					))
				}
				</ul>
			}
		</div>
	);
}
