import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const bloggerId = "4491005031879174222";
  const maxResults = 8; // Số bài viết hiển thị trên mỗi trang

  useEffect(() => {
    setLoading(true);

    const startIndex = (currentPage - 1) * maxResults + 1;
    const url = `https://www.blogger.com/feeds/${bloggerId}/posts/default?alt=json&max-results=${maxResults}&start-index=${startIndex}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const entries = data.feed.entry.map((entry) => {
          const updated = entry.updated.$t.split("T")[0]; // Lấy phần ngày tháng năm
          const title = entry.title.$t;
          const content = entry.content.$t.match(/<div\b[^>]*>(.*?)<\/div>/s)?.[1].slice(0, 80) || ""; // Lấy nội dung từ thẻ div đầu tiên, giới hạn 80 ký tự
          const categories = entry.category.map((category) => category.term);

          return {
            updated,
            title,
            content,
            categories,
          };
        });

        setPosts(entries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [bloggerId, maxResults, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>Updated: {post.updated}</p>
          <p>{post.content}</p>
          <p>Categories: {post.categories.join(", ")}</p>
        </div>
      ))}

      {/* Thêm phần phân trang ở đây */}
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

export default PostList;