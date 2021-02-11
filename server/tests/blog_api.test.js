/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

// const Blog = require('../models/blog')
// const initialBlogs = [
//   {
//     title: "title",
//     author:"author",
//     url:"www"
//   },
//   {
//     title: "title2",
//     author:"author2",
//     url:"www2"
    
//   },
// ]

const initialUsers = [
    {
      username: "ll88",
      name: "Laura B",
      id: "5fb256ef7bef8340f02f8bfd"
    }


]
beforeEach(async () => {
  //await Blog.deleteMany({})
  //await Blog.insertMany(initialBlogs)
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('Correct number of blogs', async () => {
//   const response = await api.get('/api/blogs')

//   expect(response.body).toHaveLength(initialBlogs.length)
// })

// test('id field is not undefined', async () => {
//     const response = await api.get('/api/blogs')
  
//     const ids = response.body.map(r => r.id)
//     expect(ids).toBeDefined()
//   })

// test('the spesific blog title is within returned blog titles', async () => {
//   const response = await api.get('/api/blogs')

//   const titles = response.body.map(r => r.title)

//   expect(titles).toContain('title')
// })


test('Valid username can be added', async () => {
  const newUser = {
      username: 'uusi',
      name:"uusi k",
      password:"123456",
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')

  const users = response.body.map(r => r.username)

  expect(response.body).toHaveLength(initialUsers.length + 1)
  expect(users).toContain(
    'uusi'
  )
})

test('Invalid username results in error', async () => {
  const newUser = {
      username: 'k',
      name:"uusi",
      password:"123456",
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

test('Username must be unique', async () => {
  const newUser = {
      username: 'll88',
      name:"uusi",
      password:"123456",
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

test('Onvalid password results in error', async () => {
  const newUser = {
      username: 'uusi kayttaja',
      name:"uusi",
      password:"12",
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})



// test('a valid blog can be added ', async () => {
//     const newBlog = {
//       title: 'newTitle',
//       author:"author3",
//       url:"www3",
//     }
  
//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
  
//     const response = await api.get('/api/blogs')
  
//     const titles = response.body.map(r => r.title)
  
//     expect(response.body).toHaveLength(initialBlogs.length + 1)
//     expect(titles).toContain(
//       'newTitle'
//     )
//   })

//   test('if "likes" field empty, the likes value fill be set to 0 ', async () => {
//     const newBlog = {
//       title: 'TitleWith0Likes',
//       author:"author4",
//       url:"www4",
//     }

//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
  
//     const response = await api.get('/api/blogs')
  
//     const addedBlogList = response.body.filter(r => r.title === 'TitleWith0Likes')
  
//     expect(addedBlogList[0].likes).toEqual(0)
//     })

//   test('A title is required', async () => {
//     const newBlog = {
//       author:"author4",
//       url:"www4",
//     }
  
//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(400)

//   })

//   test('An url is required', async () => {
//     const newBlog = {
//       title: 'TitleButNoUrl',
//       author:"author4",
//     }
  
//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(400)

//   })

  // describe('when there is initially one user at db', () => {
  //   beforeEach(async () => {
  //     await User.deleteMany({})
  
  //     const passwordHash = await bcrypt.hash('sekret', 10)
  //     const user = new User({ username: 'root', passwordHash })
  
  //     await user.save()
  //   })
  
  //   test('creation succeeds with a fresh username', async () => {
  //     const usersAtStart = async () => {
  //         const users = await User.find({})
  //         return users.map(u => u.toJSON())
  //       }
  
  //     const newUser = {
  //       username: 'll',
  //       name: 'Laura B',
  //       password: 'salainen',
  //     }
  
  //     await api
  //       .post('/api/users')
  //       .send(newUser)
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)
  
  //     const usersAtEnd = async () => {
  //         const users = await User.find({})
  //         return users.map(u => u.toJSON())
  //       }
  //     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
  //     const usernames = usersAtEnd.map(u => u.username)
  //     expect(usernames).toContain(newUser.username)
  //   })
  
  //   test('creation fails with proper statuscode and message if username already taken', async () => {
  //     const usersAtStart = async () => {
  //         const users = await User.find({})
  //         return users.map(u => u.toJSON())
  //       }
  
  //     const newUser = {
  //       username: 'root',
  //       name: 'Superuser',
  //       password: 'salainen',
  //     }
  
  //     const result = await api
  //       .post('/api/users')
  //       .send(newUser)
  //       .expect(400)
  //       .expect('Content-Type', /application\/json/)
  
  //     expect(result.body.error).toContain('`username` to be unique')
  
  //     const usersAtEnd = async () => {
  //         const users = await User.find({})
  //         return users.map(u => u.toJSON())
  //       }
  //     expect(usersAtEnd).toHaveLength(usersAtStart.length)
  //   })
  // })


afterAll(() => {
  mongoose.connection.close()
})

