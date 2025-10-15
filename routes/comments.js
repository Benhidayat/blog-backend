const { Router } = require('express');
const commentRouter = Router();
const {
    makeComment
} = require('../controllers/comments');

commentRouter.post('/write', makeComment);

module.exports = commentRouter;