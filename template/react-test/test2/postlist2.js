import React, { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bloggerId = "4491005031879174222";
  const maxResults = 8;

  useEffect(() => {
    setLoading(true);

    const startIndex = 1; // Không cần phân trang trong component này
    const url = `https://www.blogger.com/feeds/${bloggerId}/posts/default?alt=json&max-results=${maxResults}&start-index=${startIndex}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const entries = data.feed.entry.map((entry) => {
          // Xử lý dữ liệu như trước
        });

        setPosts(entries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [bloggerId, maxResults]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          {/* Hiển thị bài viết */}
        </div>
      ))}
    </div>
  );
};

export default PostList;