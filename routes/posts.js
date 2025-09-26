const { Router } = require('express');
const postRouters = Router();
const {
    getAllPosts
} = require('../controllers/posts');

postRouters.get('/api/v1/posts', getAllPosts);
postRouters.post()

module.exports = postRouters;