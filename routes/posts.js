
const express = require('express')

const router = express.Router()

const Post = require('../models/Post')

// ALL POST
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        res.send(err)
    }
})

// ADD POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savedData = await post.save()
        res.send(savedData)
    } catch(err) {
        res.send(err)
    }
})

// FIND A POST
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch(err) {
        res.json({message: err})
    }
})

// DELETE
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.deleteOne({_id:  req.params.postId})
        res.json(post)
    } catch(err) {
        res.json({message: err})
    }
})

// PATCH
router.patch('/:postId', async (req, res) => {
    try {
        const updateData = {
            $set: {
                title: req.body.title
            }
        }
        const post = await Post.updateOne({_id:  req.params.postId}, updateData)
        res.json(post)
    } catch(err) {
        res.json({message: err})
    }
})

module.exports = router