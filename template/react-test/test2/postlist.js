import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts?page=${currentPage}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page));
    } else {
      setCurrentPage(1);
    }
  }, [location.search]);

  // Render post components with pagination logic
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      {/* Add pagination buttons or links here */}
    </div>
  );
};

export default PostList;