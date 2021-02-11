/* eslint-disable no-undef */
describe('Blog ', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3001')
    // cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // const user = {
    //   name: 'Laura2',
    //   username: 'laura',
    //   password: 'salasana'
    // }
  // //   cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })
  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('Laura3')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()

    cy.contains('Laura logged in')
  })

  it('login fails with wrong credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('Laura2')
    cy.get('#password').type('vääräsalasana')
    cy.get('#login-button').click()

    cy.get('.error').contains('wrong credentials')
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('Laura3')
      cy.get('input:last').type('salasana')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('add a blog').click()
      cy.get('#title').type('blogtitle')
      cy.get('#author').type('blogauthor')
      cy.get('#url').type('blogUrl')
      cy.contains('create').click()
      cy.contains('blogtitle')
      cy.contains('blogauthor')
      cy.contains('blogUrl')
    })

    it('a blog can be added likes', function() {
      cy.contains('blogtitle')
        .contains('view').click()
      cy.contains('Likes: 0')
        .contains('like').click({force: true})
      
      
      cy.contains('Likes: 1')
    })
  })
})