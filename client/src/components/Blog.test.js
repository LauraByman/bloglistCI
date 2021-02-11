import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'otsikko',
    author: 'testaaja',
    url: 'testaus',
    likes: 5
  }

  const component = render(

    <Blog  blog={blog}/>
  )

  const simpleBlogInfo = component.container.querySelector('#simpleInfo')
  const detailedBlogInfo = component.container.querySelector('#detailedInfo')

  component.debug()

  expect(simpleBlogInfo).toHaveTextContent(
    'otsikko testaaja'
  )
  expect(detailedBlogInfo).toHaveTextContent(
    'testaus'
  )
  expect(detailedBlogInfo).toHaveTextContent(
    'Likes'
  )
})

test('pressing like button twice calls eventhandler twice', () => {

  const blog = {
    title: 'otsikko',
    author: 'testaaja',
    url: 'testaus',
    likes: 5
  }

  const mockHandler = jest.fn()
  let updateBlog = (b) => {b.likes = b.likes +1}
  updateBlog(blog)
  console.log("likeshere")
  console.log(blog.likes)

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler}  />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
