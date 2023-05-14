import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchPosts,
    addPost,
    deletePost,
    searchPosts,
    sortPosts
} from '../redux/actions/postActions';

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const error = useSelector(state => state.error);

    useEffect(() => {
        // Fetch posts on mount
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleAddPost = () => {
        // Create a new post with a random ID
        const newPost = {
            userId: Math.floor(Math.random() * 10) + 1,
            id: Math.floor(Math.random() * 100) + 1,
            title: 'New Post',
            body: 'Lorem ipsum dolor sit amet'
        };
        // Add the new post to the list
        dispatch(addPost(newPost));
    };
    const handleDeletePost = id => {
        // Delete the post with the given ID
        dispatch(deletePost(id));
    };

    const handleSearch = e => {
        // Filter the posts based on the search query
        dispatch(searchPosts(e.target.value));
    };

    const handleSort = e => {
        // Sort the posts based on the selected value
        dispatch(sortPosts(e.target.value));
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <input type="text" placeholder="Search" onChange={handleSearch} />
            <select onChange={handleSort}>
                <option value="">Sort by</option>
                <option value="title">Title</option>
                <option value="id">ID</option>
            </select>
            <button onClick={handleAddPost}>Add Post</button>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
