const { Router } = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRole = require('../middleware/verifyRole');
const ROLES_LIST = require('../configs/roles_list');
const postRouters = Router();
const {
    getAllPosts,
    getSinglePost,
    makePost,
    removePost
} = require('../controllers/posts');

postRouters.get('/', getAllPosts);
postRouters.get('/:id', getSinglePost);

// ADMIN SECTION
postRouters.post('/write', makePost );
postRouters.delete('/:id', removePost );
// postRouters.put('/:id', verifyJWT, verifyRole(ROLES_LIST.admin));

module.exports = postRouters;