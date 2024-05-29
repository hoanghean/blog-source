import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";

const App = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const bloggerId = "4491005031879174222";
  const maxResults = 8;

  useEffect(() => {
    setLoading(true);

    const fetchAllPosts = async () => {
      const allPostsData = [];
      let startIndex = 1;

      while (true) {
        const url = `https://www.blogger.com/feeds/${bloggerId}/posts/default?alt=json&max-results=${maxResults}&start-index=${startIndex}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          const entries = data.feed.entry;

          if (entries.length === 0) {
            break; // Không có bài viết nữa
          }

          const postsData = entries.map((entry) => {
            // Xử lý dữ liệu như trước
          });

          allPostsData.push(...postsData);
          startIndex += maxResults;
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(error);
          setLoading(false);
          return;
        }
      }

      setAllPosts(allPostsData);
      setLoading(false);
    };

    fetchAllPosts();
  }, [bloggerId, maxResults]);

  const indexOfLastPost = currentPage * maxResults;
  const indexOfFirstPost = indexOfLastPost - maxResults;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(allPosts.length / maxResults);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <PostList posts={currentPosts} />
              <div>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;