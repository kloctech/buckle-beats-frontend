import React from "react";
import { useTheme } from "../theme-context";

const Blog = () => {
  const { theme } = useTheme();
console.log(theme)
  return (
    <div className={`page ${theme}`}>
      <h1>Blog Page</h1>
      <p>Read our latest blog posts!</p>
    </div>
  );
};

export default Blog;
