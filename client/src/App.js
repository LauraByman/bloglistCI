/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')


  const setBlogList = () => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort(((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0)))
      setBlogs( sortedBlogs )
    }

    )}

  useEffect(setBlogList, [])

  //sivua ladatessa tarkastetaan onko logintietoja välimuistissa
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Blogien lisäys piilotetaan kun blogi luotu
  const BlogFormRef = useRef()

  const login = async (username, password) => {
    console.log('logging in with', username, password)
    console.log(password)

    try {
      const newUser = await loginService.login({
        username, password,
      })
      //log in tallennus selaimen välimuistiin
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(newUser)
      )
      setUser(newUser)
      blogService.setToken(newUser.token)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )}

  const createBlog = (blogObject) => {

    //use ImperativeHandle ja Ref avulla kutsutaan Togglable sisäistä funktiota toggleVisibility()
    BlogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(response => {
        const o = {
          title: response.title,
          author: response.author,
          url: response.url,
          id: response.id
        }

        setBlogs(blogs.concat(o))
        setMessage(`${o.title} has been added to bloglist`)
        setTimeout(() => {
          setMessage('')
        }, 4000)
      }).catch(error => {
        setErrorMessage('Adding a new blog failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => {

    return (
      <div>
        <LoginForm login={login}/>
      </div>
    )
  }

  const updateBlog = ( { blog } ) => {


    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }

    blogService
      .update(blog, updatedBlog)
      .then(response => {
        setBlogList()
      }).catch(error => {
        setErrorMessage('An error occured, Like was not registered')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = ( id ) => {

    blogService
      .deleteBlog(id)
      .then(response => {
        setBlogList()
      }).catch(error => {
        setErrorMessage('An error occured in blog deletion')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }


  const blogList = () => {

    return (
      <div>
        <p>{user.name} logged in.
          <button onClick={handleLogout}>Log out</button>
        </p>
        <br></br>
        <Togglable buttonLabel='add a blog' ref={BlogFormRef}>
          <AddBlogForm createBlog = {createBlog}/>
        </Togglable>
        <br></br>
        {blogs.map((blog) =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
        )}
      </div>
    )
  }

  return (

    <div>

      <h2>blogs</h2>
      <Notification message={errorMessage}></Notification>
      <Notification message={message}></Notification>
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App