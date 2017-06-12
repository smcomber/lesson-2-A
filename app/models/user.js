'use strict'

const Promise = require('bluebird')
var users = require('../database/users')

class User {
  // A new User must be passed an object with { <username:String>, <age:Number>, <fullname:String> }
  constructor ({
    username,
    age,
    fullname
  } = {}) {
    this.username = username
    this.age = age
    this.fullname = fullname
  }

  // update is a method on User.prototype. It updates the user object
  update ({
    username,
    age,
    fullname
  }) {
    const oldUsername = this.username
    const oldAge = this.age
    const oldFullname = this.fullname

    const u = users.find(user => user.username === oldUsername)
    if (!u) {
      return Promise.reject(
        Object.assign(new Error('User not found'), {
          statusCode: 404
        })
      )
    } else {
      this.username = username || oldUsername
      this.age = age || oldAge
      this.fullname = fullname || oldFullname

      users = users.filter(user => user.username !== oldUsername)
      users.push(this)
      return Promise.resolve(this)
    }
  }

  // del is a method on User.prototype. It deletes the object
  del () {
    const { username } = this
    const u = users.find(user => user.username === username)
    if (!u) {
      return Promise.reject(
        Object.assign(new Error('User not found'), {
          statusCode: 404
        })
      )
    } else {
      users = users.filter(user => user.username !== username)
    }

    return Promise.resolve({})
  }

  // create is a method on User.prototype. It creates a new object
  create () {
    const { username, age, fullname } = this
    const u = users.find(user => user.username === username)
    if (u) {
      return Promise.reject(
        Object.assign(new Error('User already exists'), {
          statusCode: 409
        })
      )
    } else {
      users.push(new User({
        username,
        age,
        fullname
      }))
    }

    return Promise.resolve(this)
  }

  // find is a method on User. Use it to find a specific user
  static find (name) {
    const u = users.find(user => user.username === name)
    if (!u) {
      return Promise.reject(
        Object.assign(new Error('User not found'), {
          statusCode: 404
        })
      )
    } else {
      const user = new User(u)
      return Promise.resolve(user)
    }
  }

  // all is a method on User. Use it to get all of the users
  static all () {
    const us = users.map(user => new User(user))
    return Promise.resolve({
      total: us.length,
      objects: us
    })
  }
}

module.exports = User
