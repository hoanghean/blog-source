import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const removeVietnameseTones = (str) => {
  str = str.toLocaleLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/ /g, "-");
  str = str.trim();
  str = str.replace(
    /!|@|%|\\^|\\\*|\\(|\\)|\\+|\\=|\\<|\\>|\\?|\\/|,|\\.|\\:|\\;|\\'|\\"|\\&|\\#|\\\[|\\\]|~|\\$|\_|\`|-|{|}|\\||\\\\/g,
    " "
  );
  return str;
};

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { pageNumber = 1 } = useParams();
  const bloggerId = "4491005031879174222";
  const maxResults = 8;

  useEffect(() => {
    setLoading(true);

    const startIndex = (pageNumber - 1) * maxResults + 1;
    const url = `https://www.blogger.com/feeds/${bloggerId}/posts/default?alt=json&max-results=${maxResults}&start-index=${startIndex}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const entries = data.feed.entry.map((entry) => {
          const updated = entry.updated.$t.split("T")[0];
          const title = entry.title.$t;
          const content = entry.content.$t.match(/<div\b[^>]*>(.*?)<\/div>/s)?.[1].slice(0, 80) || "";
          const categories = entry.category.map((category) => category.term);
          const slug = removeVietnameseTones(title);

          return {
            updated,
            title,
            content,
            categories,
            slug,
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
  }, [bloggerId, maxResults, pageNumber]);

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
          <h2>{post.title}</h2>
          <p>Updated: {post.updated}</p>
          <p>{post.content}</p>
          <p>Categories: {post.categories.join(", ")}</p>
          <p>Slug: {post.slug}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;