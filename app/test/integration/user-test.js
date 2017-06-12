'use strict'

const tap = require('tap')
const request = require('supertest')
const app = require('../../app')

tap.test('get all users', t => {
  t.test('returns 200', t => {
    return request(app)
      .get('/users')
      .then(resp => {
        t.equal(resp.statusCode, 200)
        t.equal(resp.body.total, 1)
      })
  })
  t.end()
})

tap.test('get specific user', t => {
  t.test('returns 200 and user', t => {
    const username = 'jefflembeck'
    return request(app)
      .get(`/users/${username}`)
      .then(resp => {
        t.equal(resp.statusCode, 200)
        t.equal(resp.body.username, `${username}`)
        t.equal(resp.body.age, 33)
      })
  })
  t.end()
})

tap.test('create user', t => {
  t.test('returns 201 and user', t => {
    const username = 'ada'
    const age = 201
    const fullname = 'Ada Lovelace'
    return request(app)
      .post(`/users`)
      .send({
        username,
        age,
        fullname
      }).then(resp => {
        t.equal(resp.statusCode, 201)
        t.equal(resp.body.username, `${username}`)
        t.equal(resp.body.age, age)
        t.equal(resp.body.fullname, fullname)
      })
  })

  t.test('returns 409 if user has already been created', t => {
    const username = 'ada'
    const age = 201
    const fullname = 'Ada Lovelace'

    const createAda = request(app)
      .post(`/users`)
      .send({
        username,
        age,
        fullname
      })

    return createAda.then(() => {
      return request(app)
        .post(`/users`)
        .send({
          username,
          age,
          fullname
        }).then(resp => {
          t.equal(resp.statusCode, 409)
        })
    })
  })
  t.end()
})

tap.test('delete user', t => {
  t.test('returns 204 and nothing in the body', t => {
    const username = 'ada'
    const age = 201
    const fullname = 'Ada Lovelace'

    const createAda = request(app)
      .post(`/users`)
      .send({
        username,
        age,
        fullname
      })

    return createAda.then(() => {
      return request(app)
        .delete(`/users/${username}`)
        .then(resp => {
          t.equal(resp.statusCode, 204)
          t.same(resp.body, {})
        })
    })
  })
  t.end()
})

tap.test('update user', t => {
  t.test('returns 200 and the new user data', t => {
    const username = 'ada'
    const age = 201
    const fullname = 'Ada Lovelace'

    const createAda = request(app)
      .post(`/users`)
      .send({
        username,
        age,
        fullname
      })

    return createAda.then(() => {
      return request(app)
        .put(`/users/${username}`)
        .send({
          username,
          age,
          fullname: 'Augusta Ada King-Noel, Countess of Lovelace'
        })
        .then(resp => {
          t.equal(resp.statusCode, 200)
          t.equal(resp.body.username, 'ada')
          t.equal(resp.body.age, 201)
          t.equal(resp.body.fullname, 'Augusta Ada King-Noel, Countess of Lovelace')
        })
    })
  })
  t.end()
})
