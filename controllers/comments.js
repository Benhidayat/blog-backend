const asyncHandler = require('../middleware/asyncHandler');
const {
    createComment,
} = require('../db/commentQueries');

const makeComment = asyncHandler(async (req, res) => {
    const { comment, userId, postId, parentId } = req.body;
    const reply = await createComment(comment, Number(userId), Number(postId), Number(parentId));
    res.status(201).json(reply);
});

module.exports = {
    makeComment
};

