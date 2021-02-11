import React, { useState } from 'react'

//delete blogi ei vielä toteutettu
// eslint-disable-next-line no-unused-vars
const Blog = ({ blog, updateBlog, removeBlog }) => {
  
  const [blogDetails, setShowBlogDetails] = useState(false)

  const hideWhenDetailsShown = { display: blogDetails ? 'none' : '' }
  const showWhenDetailsShown = { display: blogDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div>
      <div id = "simpleInfo" style={hideWhenDetailsShown}>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setShowBlogDetails(true)}>view</button>
        </div>
      </div>
      <div id = "detailedInfo" style = {showWhenDetailsShown}>
        <div style={blogStyle}>
          {blog.title}
          <button onClick={() => setShowBlogDetails(false)}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          Likes: {blog.likes}
          <button onClick = {() => updateBlog( { blog }) }>like</button>
          <br></br>
          {blog.author}
          {/* <button onClick = {() => removeBlog(blog.id) }>remove</button> */}
        </div>
      </div>
    </div>
  )
}


export default Blog
