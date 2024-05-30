import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxResults = 8; // Số bài viết hiển thị trên mỗi trang

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <PostList
                currentPage={currentPage}
                maxResults={maxResults}
              />
              <div>
                {/* Thêm nút phân trang ở đây */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;