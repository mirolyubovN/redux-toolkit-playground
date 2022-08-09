import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import { IPost } from '../models/IPost';

export const postAPI = createApi({
	reducerPath: 'postAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000'
		// baseUrl: 'https://jsonplaceholder.typicode.com',

	}),
	tagTypes: ['Posts'],
	endpoints: build => ({
		fetchAllUsers: build.query<IPost[], number>({
			query: (limit: number = 5) => ({
				url: '/posts',
				params: {
					_limit: limit
				}
			}),
			providesTags: result => ['Posts']
		}),
		createPost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: '/posts',
				method: 'POST',
				body: post
			}),
			invalidatesTags: ['Posts']
		}),
		updatePost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: 'PUT',
				body: post
			}),
			invalidatesTags: ['Posts']
		}),
		deletePost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: 'DELETE',
				body: post
			}),
			invalidatesTags: ['Posts']
		})
	})
})