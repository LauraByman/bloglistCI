import React, { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle ] = useState('')
  const [newAuthor, setNewAuthor ] = useState('')
  const [newUrl, setNewUrl ] = useState('')

  const addBlog = (event) => {
    event.preventDefault()


    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return(
    <div>
      <h2>Create new</h2>
      <br></br>

      <form onSubmit={addBlog}>
        <div>title: <input value={newTitle} id="title" onChange={({ target }) => setNewTitle(target.value)}/></div>
        <div>author: <input value={newAuthor} id="author" onChange={({ target }) => setNewAuthor(target.value)}/></div>
        <div>url: <input value={newUrl} id="url" onChange={({ target }) => setNewUrl(target.value)}/></div>
        <button type="submit">create</button>
      </form>

    </div>
  )

}
export default AddBlogForm