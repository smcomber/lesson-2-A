const express = require('express')
const router = express.Router();
const User = require('../models/user')


// get all users
router.get('/', (req, res) => {
  return User.all().then(user => {
    return res.status(200).send(user)
  })
})


// create user
router.post('/', (req, res) => {
    const { username, age, fullname } = req.body
    const newUser = new User({ username, age, fullname }) 
    const createUser = newUser.create()
    return createUser.then(user => {
        res.status(201).send(user)
    }).catch(err => { 
        res.status(409).send(err)
    })
})

// find specific user
router.get('/:username', (req, res) => {
    const { username } = req.params
    return User.find(username).then(user => {
        return res.status(200).send(user)
    })
});


// delete user
router.delete('/:username', (req, res) => {
    const { username } = req.params 
    const newUser = new User({ username }) 
    const deleteUser = newUser.del() 
    return deleteUser.then(user => {
        res.status(204).send(user)
    })
})

// update user
router.put('/:username', (req, res) => {
    const { username } = req.params 
    const { age, fullname } = req.body 
    const newUser = new User({ username }) 
    const updateUser = newUser.update({ username, age, fullname }) 
    return updateUser.then(user => {
        res.status(200).send(user)
    }).catch(err => {
        res.status(404).send(err)
    })
})

module.exports = router