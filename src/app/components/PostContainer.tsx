import React, { useEffect, useState } from 'react'
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';

export const PostContainer = () => {
	const [limit, setLimit] = useState(50);
	const {isError, data, isLoading, refetch} = postAPI.useFetchAllUsersQuery(limit);
	const [createPost, {error: creationError, isLoading: isCreating}] = postAPI.useCreatePostMutation();
	const [deletePost, {}] = postAPI.useDeletePostMutation();
	const [updatePost, {}] = postAPI.useUpdatePostMutation();

	useEffect(() => {
		// setTimeout(() => {
		// 	setLimit(3);
		// }, 3000)
	}, [])

	const createPostHandler = async () => {
		const title = prompt('Enter title');

		await createPost({title, body: title} as IPost);
	}

	const deletePostHandler = async (event: React.MouseEvent, post: IPost) => {
		event?.stopPropagation();
		await deletePost(post);
	}

	const updatePostHandler = async (post: IPost) => {
		const newTitle = prompt('Enter new title');
		const newPost = {...post, title: newTitle, body: newTitle};
		await updatePost(newPost as IPost);
	}

	return (
		<div>
			<button className='px-4 py-2 bg-yellow-500 rounded hover:shadow-lg hover:bg-yellow-600 transition-all text-white mr-2' onClick={() => createPostHandler()}>Create post</button>
			<button className='px-4 py-2 bg-yellow-500 rounded hover:shadow-lg hover:bg-yellow-600 transition-all text-white' onClick={() => refetch()}>Refetch</button>
			{isLoading && <h1 className='text-center font-bold'>Loading...</h1>}
			{isError && <h1 className='text-center font-bold'>Something went wrong</h1>}
			{data &&
				<ul className='list-none text-center pt-10 mx-auto'>
				{
					data.map(post => (
						<li key={post.id} onClick={() => updatePostHandler(post)} className='py-2 px-4 my-2 flex justify-between items-center'>
							<span className='font-bold mr-1 w-1/4'>Id: {post.id}</span>
							<span className='font-bold mr-1 w-1/4'>Title: {post.title}</span>
							<span className='font-bold mr-1 w-1/4'>Body: {post.body}</span>
							<button onClick={e => deletePostHandler(e, post)} className='px-4 py-2 bg-yellow-500 rounded hover:shadow-lg hover:bg-yellow-600 transition-all text-white'>Delete</button>
						</li>
					))
				}
				</ul>
			}
		</div>
	);
}
